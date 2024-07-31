import { updateProject } from "@/api/ProjectAPI";
import ProjectForm from "@/components/projects/ProjectForm";
import { Project, ProjectFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

type EditProjectFormProps = {
  projectId: Project['_id'],
  data: ProjectFormData
}

export default function EditProjectForm({ data, projectId } : EditProjectFormProps) {

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }} = useForm({defaultValues: {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  }})

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
      toast.success(data as string)
      navigate('/')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleForm = (formData : ProjectFormData) => {
    const data = {
      projectId,
      formData,
    }
    mutate(data)
  }

    return (
        <div className="max-w-3xl mx-auto mb-20">
            <h1 className="text-5xl font-black">Edit Project</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Fill out the form to edit a project</p>
    
            <nav className="my-8">
                <Link
                    to="/"
                    className="bg-yellow-300 hover:bg-yellow-400 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                >
                    Back to Projects            
                </Link>
            </nav>
    
            <form 
              className="mt-10 bg-white shadow-lg p-10 rounded-lg"
              onSubmit={handleSubmit(handleForm)}
              noValidate
            >
    
              <ProjectForm
                register={register}
                errors={errors}
              />
    
              <input 
                type="submit" 
                value="Edit Project"
                className="bg-yellow-400 hover:bg-yellow-500 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
              />
            </form>
        </div>
      )
}
