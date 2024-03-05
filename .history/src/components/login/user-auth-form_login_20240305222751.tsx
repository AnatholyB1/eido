import * as React from "react"
import { useFormik } from 'formik';
import { z } from 'zod';
import { cn } from "@/lib/utils"
import { Icons } from "../icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios';
import '@/app/globals.css'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const validationSchema = z.object({
  username: z.string().nonempty({ message: 'Name is required' }),
  password: z.string().nonempty({ message: 'Password is required' }),
});


export function UserAuthFormLogin({ className, ...props }: UserAuthFormProps) {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate: (values) => {
      try {
        validationSchema.parse(values);
      } catch (error : any) {
        return error.formErrors.fieldErrors;
      }
    },
      onSubmit: async (values) => {
          try {
              const response = await axios.post('/api/connection', values);
              console.log(response)
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="eido"
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div>{formik.errors.username}</div>
            ) : null}
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder=""
              type="password"
              autoCapitalize="none"
                          autoComplete="off"
                          autoCorrect="off"
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}