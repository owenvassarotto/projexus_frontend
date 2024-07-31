import { addUserToProject } from "@/api/TeamAPI";
import { TeamMember } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

type SearchResultProps = {
    user: TeamMember;
    resetData: () => void;
}

export default function SearchResult({ user, resetData } : SearchResultProps) {

    const params = useParams()
    const projectId = params.projectId!

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] })
            toast.success(data)
            resetData()
            navigate(location.pathname, { replace: true })
        }
    })

    const handleAddUserToProject = () => mutate({ projectId, id: user._id })

    return (
    <>
        <p className="mt-10 text-center font-bold">Result: </p>
        <div className="flex justify-between items-center">
            <p className="font-medium">{user.name}</p>
            <button 
                className="text-yellow-600 hover:bg-yellow-100 px-10 py-3 font-bold cursor-pointer"
                onClick={handleAddUserToProject}
            >
                Add to Project
            </button>
        </div>
    </>
  )
}
