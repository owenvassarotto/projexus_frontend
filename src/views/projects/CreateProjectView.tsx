import { createProject } from "@/api/ProjectAPI";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function CreateProjectView() {

  const navigate = useNavigate()

  const initialValues : ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  }
  const { register, handleSubmit, formState: { errors }} = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      toast.success(data)
      navigate('/')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleForm = (formData : ProjectFormData) => mutate(formData)

  return (
    <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Create Project</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Fill out the form to create a new project</p>

        <nav className="my-8">
            <Link
                to="/"
                className="bg-yellow-300 hover:bg-yellow-400 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            >
                Back to Projects            
            </Link>
        </nav>

        <form 
          className="mt-10 bg-white shadow-lg p-10 rounded-lg mb-20"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >

          <ProjectForm
            register={register}
            errors={errors}
          />

          <input 
            type="submit" 
            value="Create Project"
            className="bg-yellow-400 hover:bg-yellow-500 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
    </div>
  )
}
