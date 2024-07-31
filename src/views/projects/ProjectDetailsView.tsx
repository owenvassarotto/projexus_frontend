import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import { useMemo } from "react";

export default function ProjectDetailsView() {
  const params = useParams();
  const projectId = params.projectId;

  const { data: user, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId as string),
    retry: false,
  })

  const canEdit : boolean = useMemo(() =>  data?.manager === user?._id, [data, user])

  if (isLoading && authLoading) return <Spinner />

  if (isError) return <Navigate to="/404" />

  if (data && user) return (
    <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

          <nav className="my-8 flex gap-3">
            <Link 
              to="/"
              className="bg-slate-800 hover:bg-slate-900 py-3 px-6 text-white text-xl font-bold cursor-pointer transition-colors flex items-center gap-x-2"
            >
              <ArrowLeftCircleIcon className="w-8" />
              All Projects
            </Link>
            {isManager(data.manager, user._id) && (
              <>
                <button
                    type="button"
                    className="bg-yellow-400 hover:bg-yellow-500 py-3 px-10 text-white text-xl font-bold cursor-pointer transition-colors"
                    onClick={() => navigate(location.pathname + '?newTask=true')}
                >
                    Add Task
                </button>

                <Link
                  to={'team'}
                  className="bg-slate-800 hover:bg-slate-900 py-3 px-10 text-white text-xl font-bold cursor-pointer transition-colors"
                >
                  Collaborators
                </Link>
              </>
            )}
          </nav>

        <TaskList 
          tasks={data.tasks}
          canEdit={canEdit}
        />

        <AddTaskModal />
        
        <EditTaskData />

        <TaskModalDetails />
    </>
  )
}
