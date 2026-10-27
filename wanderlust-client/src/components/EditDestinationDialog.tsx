"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Save } from "lucide-react";

type Destination = {
    _id: string;
    destinationName: string;
    country: string;
    category: string;
    price: string;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
    highlights?: string[];
    rating?: number;
    reviews?: number;
    overview?: string;
};

type EditDestinationDialogProps = {
    destination: Destination;
};

type DestinationFormData = {
    destinationName: string;
    country: string;
    category: string;
    price: string;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
};

const emptyForm: DestinationFormData = {
    destinationName: "",
    country: "",
    category: "",
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
};

const EditDestinationDialog = ({
    destination,
}: EditDestinationDialogProps) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<DestinationFormData>(emptyForm);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Populate the form with the selected destination.

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            // Assumes your backend updates destinations with PUT.
            const res = await fetch(
                `http://localhost:5000/destinations/${destination._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...form,
                        price: form.price,
                    }),
                }
            );

            if (!res.ok) {
                const message = await res.text();
                throw new Error(message || "Failed to update destination.");
            }

            setOpen(false);
            router.refresh();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong while saving."
            );
        } finally {
            setSaving(false);
        }
    };

    const inputClass =
        "h-10 w-full rounded-sm border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500";

    const labelClass = "mb-1.5 block text-xs font-medium text-gray-800";

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                onClick={() => {
                    setForm({
                        destinationName: destination.destinationName ?? "",
                        country: destination.country ?? "",
                        category: destination.category ?? "",
                        price: destination.price?.toString() ?? "",
                        duration: destination.duration ?? "",
                        departureDate: destination.departureDate
                            ? destination.departureDate.slice(0, 10)
                            : "",
                        imageUrl: destination.imageUrl ?? "",
                        description: destination.description ?? "",
                    });
                    setError("");
                }}
                className="rounded border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
            >
                ✎ Edit
            </DialogTrigger>

            <DialogContent className="max-h-[98vh] w-[calc(100%-1rem)] max-w-200 overflow-y-auto rounded-2xl bg-white p-8 sm:p-12">
                <DialogHeader className="mb-1 space-y-1 text-left">
                    <DialogTitle className="text-base font-medium text-gray-900">
                        Edit Travel Package
                    </DialogTitle>

                    <DialogDescription className="text-xs text-gray-500">
                        Make changes to the travel package details below
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Destination name */}
                    <div>
                        <label htmlFor="destinationName" className={labelClass}>
                            Destination Name
                        </label>
                        <input
                            id="destinationName"
                            name="destinationName"
                            value={form.destinationName}
                            onChange={handleChange}
                            placeholder="e.g., Bali Paradise"
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Country and category */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label htmlFor="country" className={labelClass}>
                                Country
                            </label>
                            <input
                                id="country"
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                placeholder="e.g., Indonesia"
                                className={inputClass}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className={labelClass}>
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className={inputClass}
                                required
                            >
                                <option value="">Select category</option>
                                <option value="Beach">Beach</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Cultural">Cultural</option>
                                <option value="City">City</option>
                                <option value="Nature">Nature</option>
                                <option value="Luxury">Luxury</option>
                                {![
                                    "Beach",
                                    "Adventure",
                                    "Cultural",
                                    "City",
                                    "Nature",
                                    "Luxury",
                                    "",
                                ].includes(form.category) && (
                                        <option value={form.category}>
                                            {form.category}
                                        </option>
                                    )}
                            </select>
                        </div>
                    </div>

                    {/* Price and duration */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label htmlFor="price" className={labelClass}>
                                Price (USD)
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="e.g., 1299"
                                className={inputClass}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="duration" className={labelClass}>
                                Duration
                            </label>
                            <input
                                id="duration"
                                name="duration"
                                value={form.duration}
                                onChange={handleChange}
                                placeholder="e.g., 7 Days/6 Nights"
                                className={inputClass}
                                required
                            />
                        </div>
                    </div>

                    {/* Departure date */}
                    <div>
                        <label htmlFor="departureDate" className={labelClass}>
                            Departure Date
                        </label>
                        <input
                            id="departureDate"
                            name="departureDate"
                            type="date"
                            value={form.departureDate}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label htmlFor="imageUrl" className={labelClass}>
                            Image URL
                        </label>
                        <input
                            id="imageUrl"
                            name="imageUrl"
                            type="url"
                            value={form.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className={inputClass}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className={labelClass}>
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe the travel experience..."
                            rows={4}
                            className="w-full resize-y rounded-sm border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                        />
                    </div>

                    {error && (
                        <p role="alert" className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-1">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            disabled={saving}
                            className="inline-flex items-center gap-1.5 border border-red-200 px-3 py-2 text-xs text-red-500 hover:bg-red-50 disabled:opacity-50"
                        >
                            <Trash2 size={13} />
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center gap-1.5 bg-cyan-500 px-3 py-2 text-xs font-medium text-white hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save size={13} />
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditDestinationDialog;