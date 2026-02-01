import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Tag, PencilSquare, Trash } from "@medusajs/icons"
import { Container, Heading, Table, Button, IconButton, usePrompt } from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import React from "react"

type Post = {
    id: string
    title: string
    slug: string
    theme: string
    published_at: string | null
}

const PostsList = () => {
    const navigate = useNavigate()
    const prompt = usePrompt()
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const response = await fetch("/admin/blog/posts")
            return response.json()
        }
    })

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`/admin/blog/posts/${id}`, { method: "DELETE" })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        }
    })

    const handleDelete = async (id: string) => {
        const res = await prompt({
            title: "Are you sure?",
            description: "This will permanently delete the post.",
        })

        if (res) {
            deleteMutation.mutate(id)
        }
    }

    return (
        <Container>
            <div className="flex justify-between items-center mb-6">
                <Heading level="h1">Posts</Heading>
                <Link to="/posts/create">
                    <Button>Create Post</Button>
                </Link>
            </div>

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Slug</Table.HeaderCell>
                        <Table.HeaderCell>Published</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {isLoading && <Table.Row><Table.Cell>Loading...</Table.Cell></Table.Row>}
                    {!isLoading && data?.posts?.map((post: Post) => (
                        <Table.Row key={post.id}>
                            <Table.Cell>{post.title}</Table.Cell>
                            <Table.Cell>{post.slug}</Table.Cell>
                            <Table.Cell>{post.published_at ? new Date(post.published_at).toLocaleDateString() : "Draft"}</Table.Cell>
                            <Table.Cell>
                                <div className="flex gap-x-2">
                                    <Link to={`/posts/${post.id}`}>
                                        <IconButton variant="transparent">
                                            <PencilSquare />
                                        </IconButton>
                                    </Link>
                                    <IconButton variant="transparent" onClick={() => handleDelete(post.id)}>
                                        <Trash className="text-ui-fg-error" />
                                    </IconButton>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Container>
    )
}

export const config = defineRouteConfig({
    label: "Posts",
    icon: Tag,
})

export default PostsList
