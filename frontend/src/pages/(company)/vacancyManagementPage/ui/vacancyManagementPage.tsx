import { ChevronLeft, GripVertical } from "lucide-react";
import * as React from "react";
import * as Kanban from "@/shared/ui/kanban/kanban";
import { Badge } from "@/shared/ui/badge/ui/badge";
import { Button } from "@/shared/ui";
import { mockCandidatesKanban } from "@/entities/candidate/lib/mockCandidates";
import { useActions } from "@/shared/hooks/useActions";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import { Container } from "@/widgets/container/container";
import { IconButton } from "@/shared/ui/button/iconButton";
import { useNavigate } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  assignee?: string;
  dueDate?: string;
}

const COLUMN_TITLES: Record<string, string> = {
  inReview: "На рассмотрении",
  screening: "Скриннинг",
  interview: "Интервью",
  offer: "Оффер",
  rejected: "Отказ",
};

const VacancyManagementPage = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);
  const { setOpenModal } = useActions();
  const [columns, setColumns] =
    React.useState<Record<string, Task[]>>(mockCandidatesKanban);

  const handleOpenCandidate = (candidate: Task) => {
    console.log(candidate);
    setOpenModal({
      type: EModalVariables.VACANCY_MANAGEMENT_MODAL,
      isOpen: true,
      data: { ...candidate },
    });
  };

  return (
    <Container className="text-black flex-col space-y-8 pb-4">
      <section className="flex space-x-4 items-center">
        <IconButton
          ariaLabel="Перейти к профилю студента"
          className="bg-white hover:bg-white rounded-full p-2 shadow-md"
          onClick={handleBack}
        >
          <ChevronLeft className="w-5 h-5 text-zinc-600" />
        </IconButton>

        <h1 className="text-2xl">Отклики на вакансию Инженер-программист</h1>
      </section>
      <Kanban.Root
        value={columns}
        onValueChange={setColumns}
        getItemValue={(item) => item.id}
      >
        <Kanban.Board className="grid auto-rows-fr sm:grid-cols-5">
          {Object.entries(columns).map(([columnValue, tasks]) => (
            <Kanban.Column
              key={columnValue}
              value={columnValue}
              className="bg-white rounded-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">
                    {COLUMN_TITLES[columnValue]}
                  </span>
                  <Badge
                    variant="secondary"
                    className="pointer-events-none rounded-sm"
                  >
                    {tasks.length}
                  </Badge>
                </div>
                <Kanban.ColumnHandle asChild>
                  <Button variant="ghost" size="icon">
                    <GripVertical className="h-4 w-4" />
                  </Button>
                </Kanban.ColumnHandle>
              </div>
              <div className="flex flex-col gap-2 p-0.5 overflow-y-auto">
                {tasks.map((task) => (
                  <Kanban.Item
                    key={task.id}
                    value={task.id}
                    asChild
                    onClick={() => handleOpenCandidate(task)}
                  >
                    <div className="border bg-card p-3 shadow-xs rounded-2xl">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="line-clamp-1 font-medium text-sm">
                            {task.title}
                          </span>
                          <Badge
                            variant={
                              task.priority === "high"
                                ? "destructive"
                                : task.priority === "medium"
                                ? "default"
                                : "secondary"
                            }
                            className="pointer-events-none h-5 rounded-sm px-1.5 text-[11px] capitalize"
                          >
                            {task.priority}
                          </Badge>
                          <Kanban.ItemHandle asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 p-0"
                            >
                              <GripVertical className="h-4 w-4" />
                            </Button>
                          </Kanban.ItemHandle>
                        </div>
                        <div className="flex items-center justify-between text-muted-foreground text-xs">
                          {task.assignee && (
                            <div className="flex items-center gap-1">
                              <div className="size-2 rounded-full bg-primary/20" />
                              <span className="line-clamp-1">
                                {task.assignee}
                              </span>
                            </div>
                          )}
                          {task.dueDate && (
                            <time className="text-[10px] tabular-nums">
                              {task.dueDate}
                            </time>
                          )}
                        </div>
                      </div>
                    </div>
                  </Kanban.Item>
                ))}
              </div>
            </Kanban.Column>
          ))}
        </Kanban.Board>
        <Kanban.Overlay>
          <div className="size-full rounded-md bg-primary/10" />
        </Kanban.Overlay>
      </Kanban.Root>
    </Container>
  );
};

export default VacancyManagementPage;
