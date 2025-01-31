import { z } from "zod";

const registerValidationShema =z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirm_password: z.string().min(6, "Password must be at least 6 characters long"),
})

export default registerValidationShema;