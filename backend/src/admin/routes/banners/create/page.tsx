import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Container, Heading, Button, Input, Label, Select, Switch, Text } from "@medusajs/ui"
import { useForm } from "react-hook-form"
import React, { useState } from "react"

type BannerForm = {
    title: string
    subtitle: string
    image_url: string
    link_url: string
    link_text: string
    badge_text: string
    badge_color: string
    background_color: string
    text_color: string
    button_variant: string
    position: number
    is_active: boolean
}

const CreateBannerPage = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { register, handleSubmit, setValue, watch } = useForm<BannerForm>()
    const [uploading, setUploading] = useState(false)

    const createMutation = useMutation({
        mutationFn: async (data: BannerForm) => {
            const response = await fetch("/admin/banners", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error("Failed to create banner")
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["banners"] })
            navigate("/banners")
        }
    })

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append("files", file)

        try {
            const res = await fetch("/admin/uploads", {
                method: "POST",
                body: formData,
            })

            if (!res.ok) {
                throw new Error("Upload failed")
            }

            const data = await res.json()
            // Adjust based on actual API response structure (usually { files: [...] })
            if (data.files?.[0]?.url) {
                setValue("image_url", data.files[0].url)
            }
        } catch (err) {
            console.error("Upload error:", err)
            alert("Failed to upload image")
        } finally {
            setUploading(false)
        }
    }

    const onSubmit = (data: BannerForm) => {
        createMutation.mutate({
            ...data,
            position: Number(data.position),
            is_active: true
        })
    }

    const currentImageUrl = watch("image_url")

    return (
        <Container>
            <Heading level="h1" className="mb-6">Create New Banner</Heading>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-2xl">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Title</Label>
                        <Input placeholder="Autumn Collection" {...register("title", { required: true })} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Subtitle</Label>
                        <Input placeholder="Discover our new arrivals" {...register("subtitle")} />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Image</Label>
                    <div className="flex gap-4 items-start">
                        <div className="flex-1">
                            <Input type="file" onChange={handleFileUpload} disabled={uploading} accept="image/*" />
                            {uploading && <Text size="small" className="text-ui-fg-subtle mt-1">Uploading...</Text>}
                        </div>
                        <div className="flex-1">
                            <Label className="mb-1 block">Or URL</Label>
                            <Input placeholder="https://..." {...register("image_url")} />
                        </div>
                    </div>
                    {currentImageUrl && (
                        <div className="mt-2 relative h-32 w-full bg-gray-100 rounded overflow-hidden">
                            <img src={currentImageUrl} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Link URL</Label>
                        <Input placeholder="/collections/autumn" {...register("link_url", { required: true })} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Button Text</Label>
                        <Input placeholder="Shop Now" {...register("link_text", { required: true })} />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Badge Text</Label>
                        <Input placeholder="New" {...register("badge_text")} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Badge Color</Label>
                        <div className="flex gap-2">
                            <Input
                                type="color"
                                className="h-9 w-9 p-1"
                                value={watch("badge_color") || "#000000"}
                                onChange={(e) => setValue("badge_color", e.target.value)}
                            />
                            <Input
                                placeholder="#..."
                                {...register("badge_color")}
                                className="flex-1"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Background Color</Label>
                        <div className="flex gap-2">
                            <Input
                                type="color"
                                className="h-9 w-9 p-1"
                                value={watch("background_color") || "#000000"}
                                onChange={(e) => setValue("background_color", e.target.value)}
                            />
                            <Input
                                placeholder="#..."
                                {...register("background_color")}
                                className="flex-1"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Button Style</Label>
                        <select
                            className="bg-ui-bg-field border  rounded-md px-2 py-1.5 text-small-regular"
                            {...register("button_variant")}
                        >
                            <option value="secondary">Secondary (Filled)</option>
                            <option value="transparent">Transparent (Outline)</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Position (Priority)</Label>
                        <Input type="number" defaultValue={0} {...register("position")} />
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="secondary" onClick={() => navigate("/banners")}>Cancel</Button>
                    <Button type="submit" isLoading={createMutation.isPending} disabled={uploading}>Create Banner</Button>
                </div>
            </form>
        </Container>
    )
}

export default CreateBannerPage
