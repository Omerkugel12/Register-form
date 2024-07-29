import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const REGEX_NAME = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

// define your schema here
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .regex(REGEX_NAME, {
      message:
        "First name must only contain letters and spaces, no leading or trailing spaces",
    }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .regex(REGEX_NAME, {
      message:
        "Last name must only contain letters and spaces, no leading or trailing spaces",
    }),
  middleName: z
    .string()
    .min(2, { message: "Middle name must be at least 2 characters" })
    .regex(REGEX_NAME, {
      message:
        "Middle name must only contain letters and spaces, no leading or trailing spaces",
    })
    .optional(),
});

function App() {
  // define your form state and methods here
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <h1>Forms</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name..." {...field} />
                </FormControl>
                <FormDescription>This field is required.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name..." {...field} />
                </FormControl>
                <FormDescription>This field is required.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter middle name..." {...field} />
                </FormControl>
                <FormDescription>This field is optional.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

export default App;
