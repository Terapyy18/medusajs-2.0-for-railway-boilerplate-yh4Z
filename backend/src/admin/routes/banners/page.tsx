import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Tag, PencilSquare, Trash, Photo } from "@medusajs/icons"
import { Container, Heading, Table, Button, IconButton, usePrompt, StatusBadge } from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import React from "react"

type Banner = {
    id: string
    title: string
    subtitle: string
    image_url: string
    position: number
    is_active: boolean
}

const BannersList = () => {
    const navigate = useNavigate()
    const prompt = usePrompt()
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ["banners"],
        queryFn: async () => {
            const response = await fetch("/admin/banners")
            return response.json()
        }
    })

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`/admin/banners/${id}`, { method: "DELETE" })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["banners"] })
        }
    })

    const handleDelete = async (id: string) => {
        const res = await prompt({
            title: "Are you sure?",
            description: "This will permanently delete the banner.",
        })

        if (res) {
            deleteMutation.mutate(id)
        }
    }

    return (
        <Container>
            <div className="flex justify-between items-center mb-6">
                <Heading level="h1">Banners</Heading>
                <Link to="/banners/create">
                    <Button>Create Banner</Button>
                </Link>
            </div>

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Image</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Subtitle</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Priority</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {isLoading && <Table.Row><Table.Cell>Loading...</Table.Cell></Table.Row>}
                    {!isLoading && data?.banners?.map((banner: Banner) => (
                        <Table.Row key={banner.id}>
                            <Table.Cell>
                                {banner.image_url ? (
                                    <img src={banner.image_url} alt={banner.title} className="h-10 w-16 object-cover rounded" />
                                ) : (
                                    <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center">
                                        <Photo className="text-gray-400" />
                                    </div>
                                )}
                            </Table.Cell>
                            <Table.Cell>{banner.title}</Table.Cell>
                            <Table.Cell>{banner.subtitle || "-"}</Table.Cell>
                            <Table.Cell>
                                <StatusBadge color={banner.is_active ? "green" : "grey"}>
                                    {banner.is_active ? "Active" : "Inactive"}
                                </StatusBadge>
                            </Table.Cell>
                            <Table.Cell>{banner.position}</Table.Cell>
                            <Table.Cell>
                                <div className="flex gap-x-2">
                                    <Link to={`/banners/${banner.id}`}>
                                        <IconButton variant="transparent">
                                            <PencilSquare />
                                        </IconButton>
                                    </Link>
                                    <IconButton variant="transparent" onClick={() => handleDelete(banner.id)}>
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
    label: "Banners",
    icon: Photo,
})

export default BannersList
