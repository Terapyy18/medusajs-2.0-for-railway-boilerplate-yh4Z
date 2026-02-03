import { Button, Label, Text, toast } from "@medusajs/ui"
import { useRef, useState } from "react"
import { ArrowUpTray } from "@medusajs/icons"

type FileUploadProps = {
    label?: string
    onUpload: (url: string) => void
    value?: string
}

const FileUpload = ({ label = "Image", onUpload, value }: FileUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [uploading, setUploading] = useState(false)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append("files", file)

        try {
            // Medusa's default file upload route is often /admin/uploads or via correct file service.
            // In standard Medusa setups, valid route is POST /admin/uploads
            const res = await fetch("/admin/uploads", {
                method: "POST",
                body: formData,
            })

            if (res.ok) {
                const data = await res.json()
                // data.uploads is an array of objects { url, key, ... }
                if (data.uploads && data.uploads.length > 0) {
                    onUpload(data.uploads[0].url)
                    toast.success("Image uploaded successfully")
                }
            } else {
                const err = await res.json()
                toast.error(err.message || "Failed to upload image")
            }
        } catch (error) {
            toast.error("An error occurred during upload")
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <Label>{label}</Label>
            <div className="flex items-center gap-4">
                {value && (
                    <div className="w-16 h-16 rounded overflow-center border  relative">
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <Button
                    type="button"
                    variant="secondary"
                    isLoading={uploading}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <ArrowUpTray />
                    {value ? "Change Image" : "Upload Image"}
                </Button>
            </div>
        </div>
    )
}

export default FileUpload
