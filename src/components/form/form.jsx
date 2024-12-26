import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
  .object({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string() .email('Digite um email válido') .required('Email obrigatório'),
    password: yup.string() .min(6, 'A senha deve conter 6 dígitos') .required('Senha obrigatória'),
    confirmPassword: yup.string() .oneOf([yup.ref('password')],'As senhas devem ser iguais')  .required('Confirmar senha obrigatória'),
  })
  .required()

const Form = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      })

      console.log(errors)
    
      const onSubmit = (data) => console.log(data)

    return <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <section className="header">
            <h3>Formulário de cadastro</h3>
            <div className="logo"/>
            </section>
            <div className="inputs" {...register("exampleRequired", { required: true })}>
                <h2 className="criar-conta">Criar uma conta</h2>
            <label>Nome 
                <input type="text" placeholder="Digite seu nome" {...register("name", { required: true })}/>
                {<span>{errors.name?.message}</span>}
            </label>

            <label>Email 
                <input type="text" placeholder="Digite seu email" {...register("email", { required: true })}/>
                {<span>{errors.email?.message}</span>}
            </label>

            <label>Senha 
                <input type="password" placeholder="Digite sua senha" {...register("password", { required: true })}/>
                {<span>{errors.password?.message}</span>}
            </label>

            <label>Confirmar senha 
                <input type="password" placeholder="Confirme sua senha" {...register("confirmPassword", { required: true })}/>
                {<span>{errors.confirmPassword?.message}</span>}
            </label>
            <div className="botao">
           <button className="btn">cadastrar</button>
           </div>
           </div>
        </form>
    </div>
}

export default Form