import * as React from "react"
import { useFormik } from 'formik';
import { z } from 'zod';
import { cn } from "@/lib/utils"
import { Icons } from "../icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const validationSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});


export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validate: (values) => {
      try {
        validationSchema.parse(values);
      } catch (error) {
        return error.formErrors.fieldErrors;
      }
    },
    onSubmit: async (values) => {
      // Handle form submission here
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
              id="name"
              name="name"
              placeholder="eido"
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
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
            Register
          </Button>
        </div>
      </form>
    </div>
  )
}