"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  "Beach",
  "Adventure",
  "Mountain",
  "City",
  "Cultural",
  "Wildlife",
  "Desert",
];

const initialState = {
  destinationName: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

type FormState = typeof initialState;

const AddDestinationPage = () => {
  const [form, setForm] = useState<FormState>(initialState);

  const handleChange =
    (field: keyof FormState) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const token = await getTokenFromClient();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(form),
    });

    const result = await res.json();
    console.log(result)

    // Connect your travel package API here.
    console.log("New travel package:", form);
  };

  const handleCancel = () => setForm(initialState);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-16">
      <h1 className="text-4xl font-normal sm:text-5xl">
        Add New Travel Package
      </h1>

      <Card className="mx-auto mt-10 max-w-2xl shadow-sm">
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-4">
            {/* Destination Name */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="destinationName">Destination Name</Label>
              <Input
                id="destinationName"
                placeholder="Bali Paradise"
                value={form.destinationName}
                onChange={handleChange("destinationName")}
                className="h-10 bg-muted"
              />
            </div>

            {/* Country + Category */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="Indonesia"
                  value={form.country}
                  onChange={handleChange("country")}
                  className="h-10 bg-muted"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, category: value ?? "" }))
                  }
                >
                  <SelectTrigger id="category" className="h-10! w-full bg-muted">
                    <SelectValue placeholder="Beach" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price + Duration */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 1299"
                  value={form.price}
                  onChange={handleChange("price")}
                  className="h-10 bg-muted"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 7 Days/6 Nights"
                  value={form.duration}
                  onChange={handleChange("duration")}
                  className="h-10 bg-muted"
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
                type="date"
                value={form.departureDate}
                onChange={handleChange("departureDate")}
                className="h-10 bg-muted"
              />
            </div>

            {/* Image URL */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={handleChange("imageUrl")}
                className="h-10 bg-muted"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the travel experience..."
                value={form.description}
                onChange={handleChange("description")}
                className="min-h-32 bg-muted"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="border-red-200 bg-white text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={16} />
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#15A1BF] text-white hover:bg-[#15A1BF]/90"
              >
                <Save size={16} />
                Add Travel Package
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDestinationPage;