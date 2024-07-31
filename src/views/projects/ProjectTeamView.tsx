import { getProjectTeam, removeUserFromProject } from "@/api/TeamAPI";
import Spinner from "@/components/Spinner";
import AddMemberModal from "@/components/team/AddMemberModal";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";

export default function ProjectTeamView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectTeam", projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false,
  });

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: removeUserFromProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId ]})
      toast.success(data!)
    }
  })

  if (isLoading) return <Spinner />;

  if (isError) return <Navigate to={"/404"} />;

  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">Manage Collaborators</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Manage the collaborators of this project
        </p>

        <nav className="my-8 flex gap-3">
          <button
            type="button"
            className="bg-yellow-400 hover:bg-yellow-500 py-3 px-10 text-white text-xl font-bold cursor-pointer transition-colors"
            onClick={() => navigate(location.pathname + "?addMember=true")}
          >
            Add Member
          </button>

          <Link
            to={`/projects/${projectId}`}
            className="bg-gray-800 hover:bg-gray-900 py-3 px-10 text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Back to Project
          </Link>
        </nav>

        <h2 className="text-5xl font-black my-10">Actual Members</h2>

        <div className="mb-20">
          {data.length ? (
            <ul
              role="list"
              className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
            >
              {data?.map((member) => (
                <li
                  key={member._id}
                  className="flex justify-between gap-x-6 px-5 py-10"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto space-y-2">
                      <p className="text-2xl font-black text-gray-600">
                        {member.name}
                      </p>
                      <p className="text-sm text-gray-400">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-x-6">
                    <Menu as="div" className="relative flex-none">
                      <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">options</span>
                        <EllipsisVerticalIcon
                          className="h-9 w-9"
                          aria-hidden="true"
                        />
                      </MenuButton>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                          <MenuItem>
                            <button
                              type="button"
                              className="block px-3 py-1 text-sm leading-6 text-red-500"
                              onClick={() => mutate({ projectId, userId: member._id })}
                            >
                              Delete from project
                            </button>
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center py-20">
              There are no members in the project.
            </p>
          )}
        </div>

        <AddMemberModal />
      </>
    );
}
