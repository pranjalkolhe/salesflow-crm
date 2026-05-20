import { useState } from "react";
import AddDealModal from "../components/AddDealModal";
import ConfirmModal from "@/components/ui/ConfirmModal";
import useActivityLogger from "@/components/activity/useActivityLogger";
import useNotificationStore from "@/store/useNotificationStore";
import useToastStore from "@/store/useToastStore";
import {
  DndContext,
  closestCorners,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";

import DealCard from "../components/DealCard";
import DealsHeader from "../components/DealsHeader";

import useDeals from "../hooks/useDeals";
import DealDetailsDrawer from "../components/DealDetailsDrawer";

const columnColors = {
  Qualified: "from-blue-500 to-indigo-600",

  Proposal: "from-amber-400 to-orange-500",

  Negotiation: "from-violet-500 to-purple-600",

  Won: "from-emerald-500 to-green-600",

  Lost: "from-rose-500 to-red-500",
};

const stages = ["Qualified", "Proposal", "Negotiation", "Won", "Lost"];

const DroppableColumn = ({ column, children, isHovered }) => {
  const { setNodeRef } = useDroppable({
    id: column.stage,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex h-[calc(100vh-320px)] w-[420px] flex-shrink-0 flex-col rounded-[32px] bg-slate-100 transition-all duration-200 ${
        isHovered ? "scale-[1.01] ring-4 ring-blue-300 shadow-2xl" : ""
      }`}
    >
      {children}
    </div>
  );
};

const DealsPage = () => {
  const {
    groupedDeals,
    totalDeals,
    totalValue,
    wonDeals,
    moveDeal,
    addDeal,
    updateDeal,
    deleteDeal,
  } = useDeals();

  const [selectedDeal, setSelectedDeal] = useState(null);
  const [deleteDealData, setDeleteDealData] = useState(null);
  const [activeDeal, setActiveDeal] = useState(null);

  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [editingDeal, setEditingDeal] = useState(null);
  const { addNotification } = useNotificationStore();
  const { addToast } = useToastStore();
  const { logActivity } = useActivityLogger();

  // Drag Start
  const handleDragStart = (event) => {
    const draggedDeal = groupedDeals
      .flatMap((column) => column.deals)
      .find((deal) => deal.id.toString() === event.active.id);

    setActiveDeal(draggedDeal);
  };

  // Drag End
  const handleDragEnd = (event) => {
    const { active, over } = event;

    setHoveredColumn(null);

    if (!over) return;

    const dealId = Number(active.id);
    const activeDeal = groupedDeals
      .flatMap((column) => column.deals)
      .find((deal) => deal.id === dealId);

    // Prevent same-stage drop
    if (activeDeal?.stage === over.id) {
      return;
    }

    // Only allow valid stages
    if (stages.includes(over.id)) {
      moveDeal(dealId, over.id);

      const movedDeal = groupedDeals
        .flatMap((column) => column.deals)
        .find((deal) => deal.id === dealId);

      if (movedDeal) {
        logActivity({
          type: "deal",

          title: `${movedDeal.company} moved to ${over.id}`,
        });

        addNotification({
          type: "deal",

          title: "Deal moved",

          message: `${movedDeal.company} moved to ${over.id}.`,

          time: "Just now",
        });
        addToast({
          type: "deal",

          title: "Deal moved",

          message: `${movedDeal.company} moved to ${over.id}.`,
        });
      }
    }

    setActiveDeal(null);
  };

  return (
    <div className="flex h-full flex-col gap-8">
      {/* Header */}
      <DealsHeader
        totalDeals={totalDeals}
        totalValue={totalValue}
        wonDeals={wonDeals}
        onAddDeal={() => {
          setEditingDeal(null);

          setOpenModal(true);
        }}
      />

      {/* Board */}
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={(event) => {
          if (event.over?.id && stages.includes(event.over.id)) {
            setHoveredColumn(event.over.id);
          }
        }}
        onDragEnd={handleDragEnd}
      >
        <div className="hide-scrollbar flex-1 overflow-x-auto overflow-y-hidden pb-4">
          <div className="flex w-max gap-6 px-1">
            {groupedDeals.map((column) => (
              <DroppableColumn
                key={column.stage}
                column={column}
                isHovered={hoveredColumn === column.stage}
              >
                {/* Column Header */}
                <div
                  className={`sticky top-0 z-10 rounded-t-[32px] bg-gradient-to-r px-6 py-5 text-white shadow-lg ${
                    columnColors[column.stage]
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">{column.stage}</h2>

                    <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur-lg">
                      {column.deals.length}
                    </span>
                  </div>
                </div>

                {/* Cards */}
                <div className="flex-1 space-y-4 overflow-y-auto p-4">
                  {column.deals.length > 0 ? (
                    column.deals.map((deal) => (
                      <DealCard
                        key={deal.id}
                        deal={deal}
                        onView={(deal) => setSelectedDeal(deal)}
                        onEdit={(deal) => {
                          setEditingDeal(deal);

                          setOpenModal(true);
                        }}
                        onDelete={(deal) => setDeleteDealData(deal)}
                      />
                    ))
                  ) : (
                    <div className="flex h-40 items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white text-center text-sm font-medium text-slate-400">
                      No deals
                    </div>
                  )}
                </div>
              </DroppableColumn>
            ))}
          </div>
        </div>

        {/* Overlay */}
        <DragOverlay>
          {activeDeal ? (
            <div className="rotate-3 opacity-90">
              <DealCard deal={activeDeal} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      <AddDealModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        initialData={editingDeal}
        vonSubmit={(data) => {
          if (editingDeal) {
            updateDeal(editingDeal.id, data);

            logActivity({
              type: "deal",

              title: `${data.company} deal updated`,
            });

            addNotification({
              type: "deal",

              title: "Deal updated",

              message: `${data.company} updated successfully.`,

              time: "Just now",
            });

            addToast({
              type: "deal",

              title: "Deal updated",

              message: `${data.company} updated successfully.`,
            });
          } else {
            addDeal(data);

            logActivity({
              type: "deal",

              title: `${data.company} deal created`,
            });

            addNotification({
              type: "deal",

              title: "Deal created",

              message: `${data.company} created successfully.`,

              time: "Just now",
            });

            addToast({
              type: "deal",

              title: "Deal created",

              message: `${data.company} created successfully.`,
            });
          }
        }}
      />
      <ConfirmModal
        open={!!deleteDealData}
        title="Delete Deal"
        message={`Are you sure you want to delete "${deleteDealData?.company}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
        onClose={() => setDeleteDealData(null)}
        onConfirm={() => {
          deleteDeal(deleteDealData.id);

          logActivity({
            type: "deal",

            title: `${deleteDealData.company} deal deleted`,
          });

          addNotification({
            type: "deal",

            title: "Deal deleted",

            message: `${deleteDealData.company} removed from pipeline.`,

            time: "Just now",
          });

          addToast({
            type: "deal",

            title: "Deal deleted",

            message: `${deleteDealData.company} removed from pipeline.`,
          });

          setDeleteDealData(null);
        }}
      />
      {/* Modal */}
      <DealDetailsDrawer
        deal={selectedDeal}
        open={!!selectedDeal}
        onClose={() => setSelectedDeal(null)}
      />
    </div>
  );
};

export default DealsPage;
