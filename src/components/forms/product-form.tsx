"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ProgressUpload from "../file-upload/progress-upload";
import SortableImageUpload from "../file-upload/sortable";
import ImageUpload, { ImageFile } from "../file-upload/image-upload";
import {
  uploadImageToServer,
  createProduct,
} from "@/lib/data/uploadImage";
import getCategory from "@/lib/data/getCategory";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Product title must be at least 5 characters.")
    .max(32, "Product title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Product must be at least 20 characters.")
    .max(100, "Product must be at most 100 characters."),
  price: z.coerce.number().positive("Price must be greater than 0"),
  catagories: z
    .string()
    .min(1, "Please select your spoken language.")
    .refine((val) => val !== "auto", {
      message:
        "Auto-detection is not allowed. Please select a specific language.",
    }),
  image: z.any(),
});


const spokenLanguages = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
] as const



const data = await getCategory();
console.log("I can get category : ", data);

export function ProductForm() {
  const formData = new FormData();
  const [images, setImages] = React.useState<ImageFile[]>([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      catagories: "",
      image: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // toast("You submitted the following values:", {
    //   description: (
    //     <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
    //       <code>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    //   position: "bottom-right",
    //   classNames: {
    //     content: "flex flex-col gap-2",
    //   },
    //   style: {
    //     "--border-radius": "calc(var(--radius)  + 4px)",
    //   } as React.CSSProperties,
    // });

    for (const image of images) {
      formData.append("file", image.file);
    }

    const resp = await uploadImageToServer(formData)
    console.log("File Upload to server:", resp);

    // array of image URLs
    // let urls: string[] = [];
    // if (Array.isArray(resp)) {
    //   urls = resp
    //     .map(
    //       (u: any) =>
    //         u.location ?? u.url ?? u.path ?? u.fileUrl ?? u.src ?? u.filename,
    //     )
    //     .filter(Boolean);
    // } else if (Array.isArray(resp?.files)) {
    //   urls = resp.files
    //     .map((f: any) => f.location ?? f.url ?? f.path ?? f.fileUrl ?? f.src)
    //     .filter(Boolean);
    // } else if (resp?.location || resp?.url) {
    //   urls = [resp.location ?? resp.url];
    // }

    const urls = [resp.location]

    console.log("URL : " ,urls);


    console.log("All data from data when submit : ", data);

    const productPayload = {
      title: data.title,
      price: data.price,
      description: data.description,
      categoryId: Number(data.catagories),
      // categoryId: 1,
      images: urls,
    };


    
    console.log("All Data here : ",data);

    try {
      await createProduct(productPayload);
      toast("Product created");
      form.reset();
      setImages([]);
    } catch (err) {
      console.error("Error creating product:", err);
      toast("Failed to create product");
    }
  }

  // create for handle upload image and this fun use in OnImageChange(Interface)
  function handleImageUpload(images: ImageFile[]) {
    setImages(images);
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Bug Report</CardTitle>
        <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* TODO product title controller */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Bug Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Mackbook Pro 16"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* TODO Product detail controll */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="price">Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="price"
                      placeholder="Please Input price"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Include steps to reproduce, expected behavior, and what
                    actually happened.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* TODO product price */}
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-price">Price</FieldLabel>

                  <InputGroup>
                    <Input
                      id="form-rhf-demo-price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      aria-invalid={fieldState.invalid}
                      value={(field.value as number | undefined) ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                        )
                      }
                    />
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* TODO controller language */}
            <Controller
              name="catagories"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-language">
                      Spoken Language
                    </FieldLabel>
                    <FieldDescription>
                      For best results, select the language you speak.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectSeparator />
                      {spokenLanguages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}

                      {/* {spokenLanguages.map((language) => (
                        <SelectItem key={language.id} value={language.id}>
                          {language.name}
                        </SelectItem>
                      ))} */}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            {/* File upload */}
            {/* <Field>
              <FieldLabel htmlFor="picture">Picture</FieldLabel>
              <Input id="picture" type="file" />
              <FieldDescription>Select a picture to upload.</FieldDescription>
            </Field> */}
            {/* <ProgressUpload /> */}
            {/* <SortableImageUpload /> */}
            <ImageUpload {...Field} onImagesChange={handleImageUpload} />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
