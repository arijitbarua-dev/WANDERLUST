
"use client";

import { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { redirect } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type DeleteDestinationDialogProps = {
    destinationId: string;
    destinationName: string;
};

const DeleteDestinationDialog = ({
    destinationId,
    destinationName,
}: DeleteDestinationDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            setError("");

            const token = await getTokenFromClient();
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/destinations/${destinationId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete the travel package.");
            }

            redirect("/destinations");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
            setIsDeleting(false);
        }
    };

    return (
        <>
            {/* Cancel button */}
            <button
                type="button"
                onClick={() => {
                    setError("");
                    setIsOpen(true);
                }}
                className="rounded border border-red-200 px-5 py-2.5 text-lg text-red-500 hover:bg-red-50"
            >
                Cancel
            </button>

            {/* Delete confirmation modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget && !isDeleting) {
                            setIsOpen(false);
                        }
                    }}
                >
                    <div
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="delete-dialog-title"
                        aria-describedby="delete-dialog-description"
                        className="relative w-full max-w-md bg-white p-7 shadow-xl sm:max-w-md"
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            disabled={isDeleting}
                            aria-label="Close dialog"
                            className="absolute right-3 top-3 text-gray-400 transition hover:text-gray-700 disabled:opacity-50"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        {/* Title and warning icon */}
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>

                            <h2
                                id="delete-dialog-title"
                                className="text-xl font-semibold tracking-tight text-gray-900"
                            >
                                Delete Travel Package
                            </h2>
                        </div>

                        {/* Confirmation message */}
                        <p
                            id="delete-dialog-description"
                            className="mb-7 text-base leading-relaxed text-gray-600"
                        >
                            Are you sure you want to delete{" "}
                            <strong className="font-semibold text-gray-900">
                                &quot;{destinationName}&quot;
                            </strong>
                            ? This action cannot be undone and will permanently
                            remove this travel package from the system.
                        </p>

                        {/* Error message */}
                        {error && (
                            <p
                                role="alert"
                                className="mb-5 text-base leading-relaxed text-red-500"
                            >
                                {error}
                            </p>
                        )}

                        {/* Action buttons */}
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                disabled={isDeleting}
                                className="border border-gray-200 px-5 py-3 text-base text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex items-center justify-center gap-2 bg-red-500 px-5 py-3 text-base font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Trash2 className="h-4 w-4" />
                                {isDeleting
                                    ? "Deleting..."
                                    : "Delete Package"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteDestinationDialog;