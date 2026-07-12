/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { trainerServices } from "@/services/trainer.services";
import { useQuery } from "@tanstack/react-query";
import TrainerCard from "./TrainerCard";

export interface ITrainerProps {
  id: string;
  userId: string;
  bio: string;
  specialties: string;
  experience: number;
  feePerHour: number;
  avgRating: number;
  isApproved: boolean;
  createdAt: string;
  user: {
    name: string;
    email: string;
    image: string;
    status: string;
    isDeleted: boolean;
  };
}

const AllTrainers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "feePerHourDesc" | "feePerHourAsc" | "avgRatingDesc" | "avgRatingAsc" | "experienceDesc" | "experienceAsc">("name");
  const [minRating, setMinRating] = useState<string>("");
  const [maxRating, setMaxRating] = useState<string>("");
  const [minFee, setMinFee] = useState<string>("");
  const [maxFee, setMaxFee] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const buildQueryParams = () => {
    const params: Record<string, any> = {};

    if (debouncedSearchTerm) {
      params.searchTerm = debouncedSearchTerm;
    }

    if (minRating) {
      params["avgRating[gte]"] = minRating;
    }

    if (maxRating) {
      params["avgRating[lte]"] = maxRating;
    }

    if (minFee) {
      params["feePerHour[gte]"] = minFee;
    }

    if (maxFee) {
      params["feePerHour[lte]"] = maxFee;
    }

    if (sortBy === "name") {
      params.sortBy = "user.name";
      params.sortOrder = "asc";
    } else if (sortBy === "feePerHourDesc") {
      params.sortBy = "feePerHour";
      params.sortOrder = "desc";
    } else if (sortBy === "feePerHourAsc") {
      params.sortBy = "feePerHour";
      params.sortOrder = "asc";
    } else if (sortBy === "avgRatingDesc") {
      params.sortBy = "avgRating";
      params.sortOrder = "desc";
    } else if (sortBy === "avgRatingAsc") {
      params.sortBy = "avgRating";
      params.sortOrder = "asc";
    } else if (sortBy === "experienceDesc") {
      params.sortBy = "experience";
      params.sortOrder = "desc";
    } else if (sortBy === "experienceAsc") {
      params.sortBy = "experience";
      params.sortOrder = "asc";
    }

    return params;
  };

  const queryParams = buildQueryParams();

  const { data, isLoading } = useQuery({
    queryKey: ["trainers", queryParams],
    queryFn: () => trainerServices.getAllTrainersApprovedOnly({ params: queryParams }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const trainers: ITrainerProps[] = data?.data || [];

  const handleClearFilters = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setSortBy("name");
    setMinRating("");
    setMaxRating("");
    setMinFee("");
    setMaxFee("");
  };

  const isFiltered = searchTerm || minRating || maxRating || minFee || maxFee || sortBy !== "name";

  return (
    <div className="max-w-7xl mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
      <div className="bg-gray-50 border rounded-xl p-3 mb-5 sm:p-4 sm:mb-6 md:p-5 md:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-xs sm:text-sm text-slate-800 transition-all"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
              </svg>
            </div>
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-xs sm:text-sm text-slate-700 transition-all"
            >
              <option value="name">Sort by: Alphabetical</option>
              <option value="feePerHourDesc">Sort by: Fee (High-Low)</option>
              <option value="feePerHourAsc">Sort by: Fee (Low-High)</option>
              <option value="avgRatingDesc">Sort by: Rating (High-Low)</option>
              <option value="avgRatingAsc">Sort by: Rating (Low-High)</option>
              <option value="experienceDesc">Sort by: Experience (High-Low)</option>
              <option value="experienceAsc">Sort by: Experience (Low-High)</option>
            </select>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Rating"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-1/2 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-xs sm:text-sm transition-all"
            />
            <input
              type="number"
              placeholder="Max Rating"
              value={maxRating}
              onChange={(e) => setMaxRating(e.target.value)}
              className="w-1/2 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-xs sm:text-sm transition-all"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Fee ($)"
              value={minFee}
              onChange={(e) => setMinFee(e.target.value)}
              className="w-1/2 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-xs sm:text-sm transition-all"
            />
            <input
              type="number"
              placeholder="Max Fee ($)"
              value={maxFee}
              onChange={(e) => setMaxFee(e.target.value)}
              className="w-1/2 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 text-xs sm:text-sm transition-all"
            />
          </div>

          <div className="w-full">
            {isFiltered && (
              <button
                onClick={handleClearFilters}
                className="w-full py-2 px-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-75">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-01"></div>
        </div>
      ) : trainers.length === 0 ? (
        <div className="text-center py-10 bg-white border border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-400 text-xs sm:text-sm">No trainers match your matching filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {trainers.map((trainer: ITrainerProps) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTrainers;