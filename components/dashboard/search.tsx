import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { LucideSearch } from 'lucide-react'; // Assuming LucideSearch is from Lucide icons
import Link from 'next/link';
import { TCourses } from '@/app/lib/types';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<TCourses[]>([]); // Array to hold search results
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false); // To toggle result visibility

    // Function to call search API
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchTerm.trim() === '') {
                setSearchResults([]);
                return;
            }

            setIsLoading(true);
            try {
                // Mock search API call
                const res = await fetch(`/api/courses/search?query=${searchTerm}`);
                const data = await res.json();
                setSearchResults(data.body); // Assuming the API returns a 'results' array
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setIsLoading(false);
            }
        };

        // Adding a slight delay to avoid calling API on every keystroke
        const timeoutId = setTimeout(() => {
            fetchSearchResults();
        }, 300); // 300ms delay

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    return (
        <div className="hidden md:block relative w-96">
            {/* Search Input */}
            <div className="flex items-center space-x-2 border border-gray-300 px-2 rounded">
                <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowResults(true); // Show results dropdown when user types
                    }}
                    onBlur={() => setTimeout(() => setShowResults(false), 200)} // Hide results on blur, with delay to allow clicks
                    className="w-96 border-none outline-none ring-0 focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-0"
                />
                <LucideSearch className="w-6 h-6 text-gray-600 cursor-pointer" />
            </div>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-[1000]">
                    {isLoading ? (
                        <p className="p-2 text-gray-500">Searching...</p>
                    ) : (
                        <ul>
                            {searchResults.map((result) => (
                                <li key={result.categoryId}>
                                    <Link
                                        href={`/dashboard/browse/${result.categoryId}`} // Assuming each result has an `id` field
                                        className="block p-2 hover:bg-gray-100 text-gray-800"
                                    >
                                        {result.categoryTitle}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
