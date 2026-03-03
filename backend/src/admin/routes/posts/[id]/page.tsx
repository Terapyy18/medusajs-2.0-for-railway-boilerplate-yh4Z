import { Heading, Input, Textarea, Button, Container, Label, toast } from "@medusajs/ui"
import { useState, useEffect } from "react"
import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import FileUpload from "../../../components/FileUpload"

const EditPost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [content, setContent] = useState("")
    const [excerpt, setExcerpt] = useState("")
    const [image, setImage] = useState("")

    const { data, isLoading: isFetching } = useQuery({
        queryKey: ["post", id],
        queryFn: async () => {
            const res = await fetch(`/admin/blog/posts/${id}`)
            return res.json()
        }
    })

    useEffect(() => {
        if (data && data.post) {
            setTitle(data.post.title || "")
            setSlug(data.post.slug || "")
            setContent(data.post.content || "")
            setExcerpt(data.post.excerpt || "")
            setImage(data.post.main_image || "")
        }
    }, [data])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`/admin/blog/posts/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    slug,
                    content,
                    excerpt,
                    main_image: image,
                    theme: "none" // Keep passing none to satisfy backend if needed, or remove if backend allows optional
                })
            })

            if (res.ok) {
                toast.success("Post updated successfully")
                navigate("/posts")
            } else {
                const err = await res.json()
                toast.error(err.message || "Failed to update post")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    if (isFetching) return <Container>Loading...</Container>

    return (
        <Container>
            <Heading level="h1" className="mb-6">Edit Post</Heading>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label>Title</Label>
                    <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Slug</Label>
                    <Input placeholder="slug-for-post" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                </div>

                <FileUpload
                    label="Main Image"
                    value={image}
                    onUpload={setImage}
                />

                {/* Theme field removed */}

                <div className="flex flex-col gap-2">
                    <Label>Excerpt</Label>
                    <Textarea placeholder="Short summary..." value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Content</Label>
                    <div className="bg-white text-black">
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            className="h-[300px] mb-12"
                        />
                    </div>
                </div>

                <Button type="submit" isLoading={loading} className="mt-4">Save Changes</Button>
            </form>
        </Container>
    )
}

export default EditPost
