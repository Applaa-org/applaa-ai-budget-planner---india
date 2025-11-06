"use client";

import { useState } from "react";
import { MapPin, IndianRupee, Mountain, Waves, Building, Utensils, Star, Train, Plane, Bus, Coffee, Camera, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { MadeWithApplaa } from "@/components/made-with-applaa";

interface Destination {
  id: number;
  name: string;
  state: string;
  distance: string;
  travelCost: number;
  hotelCost: number;
  foodCost: number;
  totalCost: number;
  duration: string;
  highlights: string[];
  hiddenGem: string;
  travelMode: string;
  image: string;
  badge: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Lonavala",
    state: "Maharashtra",
    distance: "83 km",
    travelCost: 800,
    hotelCost: 2000,
    foodCost: 1500,
    totalCost: 6500,
    duration: "2 days",
    highlights: ["Tiger's Leap Point", "Bhushi Dam", "Karla Caves", "Lonavala Lake"],
    hiddenGem: "Tiger's Leap Point at sunset offers breathtaking valley views",
    travelMode: "Train/Bus",
    image: "https://picsum.photos/400/300?random=lonavala",
    badge: "Mountain Seeker"
  },
  {
    id: 2,
    name: "Mahabaleshwar",
    state: "Maharashtra",
    distance: "120 km",
    travelCost: 1200,
    hotelCost: 2000,
    foodCost: 2000,
    totalCost: 10500,
    duration: "3 days",
    highlights: ["Venna Lake", "Pratapgarh Fort", "Mapro Garden", "Elephant's Head Point"],
    hiddenGem: "Mapro Garden Café serves the freshest strawberry cream",
    travelMode: "Bus",
    image: "https://picsum.photos/400/300?random=mahabaleshwar",
    badge: "Mountain Seeker"
  },
  {
    id: 3,
    name: "Goa",
    state: "Goa",
    distance: "590 km",
    travelCost: 2500,
    hotelCost: 1500,
    foodCost: 2500,
    totalCost: 12000,
    duration: "4 days",
    highlights: ["Baga Beach", "Fort Aguada", "Dudhsagar Falls", "Anjuna Flea Market"],
    hiddenGem: "Butterfly Beach - a secluded paradise accessible by boat",
    travelMode: "Train",
    image: "https://picsum.photos/400/300?random=goa",
    badge: "Beach Lover"
  },
  {
    id: 4,
    name: "Udaipur",
    state: "Rajasthan",
    distance: "760 km",
    travelCost: 3500,
    hotelCost: 1800,
    foodCost: 2000,
    totalCost: 15000,
    duration: "3 days",
    highlights: ["City Palace", "Lake Pichola", "Jag Mandir", "Saheliyon Ki Bari"],
    hiddenGem: "Ambrai Ghat offers the most romantic sunset views",
    travelMode: "Train/Flight",
    image: "https://picsum.photos/400/300?random=udaipur",
    badge: "Heritage Explorer"
  },
  {
    id: 5,
    name: "Rishikesh",
    state: "Uttarakhand",
    distance: "240 km",
    travelCost: 1800,
    hotelCost: 1200,
    foodCost: 1500,
    totalCost: 8500,
    duration: "3 days",
    highlights: ["Lakshman Jhula", "Ram Jhula", "Triveni Ghat", "Beatles Ashram"],
    hiddenGem: "Neer Garh Waterfall - a hidden natural pool perfect for swimming",
    travelMode: "Train/Bus",
    image: "https://picsum.photos/400/300?random=rishikesh",
    badge: "Spiritual Seeker"
  },
  {
    id: 6,
    name: "Pondicherry",
    state: "Puducherry",
    distance: "160 km",
    travelCost: 1000,
    hotelCost: 1500,
    foodCost: 1800,
    totalCost: 7300,
    duration: "2 days",
    highlights: ["Promenade Beach", "Auroville", "French Quarter", "Aurobindo Ashram"],
    hiddenGem: "Paradise Beach - accessible by boat, perfect for sunrise",
    travelMode: "Bus",
    image: "https://picsum.photos/400/300?random=pondicherry",
    badge: "Beach Lover"
  },
  {
    id: 7,
    name: "Mysore",
    state: "Karnataka",
    distance: "145 km",
    travelCost: 800,
    hotelCost: 1300,
    foodCost: 1200,
    totalCost: 6100,
    duration: "2 days",
    highlights: ["Mysore Palace", "Chamundi Hills", "Brindavan Gardens", "St. Philomena's Church"],
    hiddenGem: "Karanji Lake - peaceful bird sanctuary with boating",
    travelMode: "Train/Bus",
    image: "https://picsum.photos/400/300?random=mysore",
    badge: "Heritage Explorer"
  },
  {
    id: 8,
    name: "Coorg",
    state: "Karnataka",
    distance: "250 km",
    travelCost: 1200,
    hotelCost: 1800,
    foodCost: 1500,
    totalCost: 9300,
    duration: "3 days",
    highlights: ["Abbey Falls", "Raja's Seat", "Coffee Plantations", "Dubare Elephant Camp"],
    hiddenGem: "Mandalpatti Peak - stunning 360-degree mountain views",
    travelMode: "Bus",
    image: "https://picsum.photos/400/300?random=coorg",
    badge: "Mountain Seeker"
  }
];

const tripTypes = [
  { value: "beach", label: "Beach", icon: Waves, color: "from-blue-500 to-cyan-500" },
  { value: "hills", label: "Hills", icon: Mountain, color: "from-green-500 to-emerald-500" },
  { value: "heritage", label: "Heritage", icon: Building, color: "from-amber-500 to-orange-500" },
  { value: "adventure", label: "Adventure", icon: Star, color: "from-red-500 to-pink-500" },
  { value: "city", label: "City", icon: Building, color: "from-purple-500 to-indigo-500" },
  { value: "spiritual", label: "Spiritual", icon: Star, color: "from-saffron-500 to-orange-500" }
];

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
  "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam",
  "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad",
  "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad",
  "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur"
];

export default function Index() {
  const [currentCity, setCurrentCity] = useState("");
  const [budget, setBudget] = useState("");
  const [tripType, setTripType] = useState("");
  const [results, setResults] = useState<Destination[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentCity || !budget || !tripType) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const budgetNum = parseInt(budget);
      let filteredDestinations = destinations.filter(dest => dest.totalCost <= budgetNum);
      
      // Filter by trip type logic
      if (tripType === "beach") {
        filteredDestinations = filteredDestinations.filter(dest => 
          ["Goa", "Pondicherry"].includes(dest.name)
        );
      } else if (tripType === "hills") {
        filteredDestinations = filteredDestinations.filter(dest => 
          ["Lonavala", "Mahabaleshwar", "Coorg"].includes(dest.name)
        );
      } else if (tripType === "heritage") {
        filteredDestinations = filteredDestinations.filter(dest => 
          ["Udaipur", "Mysore"].includes(dest.name)
        );
      } else if (tripType === "spiritual") {
        filteredDestinations = filteredDestinations.filter(dest => 
          ["Rishikesh"].includes(dest.name)
        );
      }

      if (filteredDestinations.length === 0) {
        // Show nearby weekend getaways for low budget
        filteredDestinations = destinations.filter(dest => dest.totalCost <= 5000);
        toast.info("Your budget is tight for long trips. Here are some great weekend getaways near your city!");
      }

      setResults(filteredDestinations.slice(0, 5));
      setShowResults(true);
      setLoading(false);
    }, 2000);
  };

  const resetForm = () => {
    setCurrentCity("");
    setBudget("");
    setTripType("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-teal-50 to-orange-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-lg border-b border-orange-200/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
              AI Budget Planner - India
            </h1>
          </div>
          <p className="text-center text-gray-600 mt-2">Discover amazing destinations within your budget! 🗺️</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!showResults ? (
          <div className="max-w-2xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
                <IndianRupee className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-gray-700">Smart Travel Planning</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Where can you go with your budget?
              </h2>
              <p className="text-xl text-gray-600">
                Tell us your budget and preferences, we'll find the perfect Indian destinations for you!
              </p>
            </div>

            {/* Form */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-orange-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-800">Plan Your Trip ✈️</CardTitle>
                <CardDescription className="text-gray-600">
                  Fill in your travel preferences to get personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Current City */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <MapPin className="w-4 h-4 text-teal-600" />
                      <span>Your Current City</span>
                    </label>
                    <select
                      value={currentCity}
                      onChange={(e) => setCurrentCity(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select your city</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <IndianRupee className="w-4 h-4 text-teal-600" />
                      <span>Total Budget (INR)</span>
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter your budget (e.g., 12000)"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      required
                      min="1000"
                    />
                  </div>

                  {/* Trip Type */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Star className="w-4 h-4 text-teal-600" />
                      <span>Type of Trip</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {tripTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setTripType(type.value)}
                            className={`p-4 rounded-lg border-2 transition-all duration-200 ${tripType === type.value
                              ? "border-orange-500 bg-gradient-to-r " + type.color + " text-white"
                              : "border-gray-300 bg-white hover:border-orange-300 hover:bg-orange-50"
                            }`}
                          >
                            <Icon className="w-6 h-6 mx-auto mb-2" />
                            <span className="text-sm font-medium">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Finding destinations...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Map className="w-5 h-5" />
                        <span>Find My Destinations</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Results Section */
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                🎉 Perfect Destinations for You!
              </h2>
              <p className="text-xl text-gray-600">
                Here are amazing places you can visit within your ₹{budget} budget
              </p>
              <Button
                onClick={resetForm}
                variant="outline"
                className="mt-4 border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                Plan Another Trip
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((destination) => (
                <Card key={destination.id} className="bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                        {destination.badge}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-gray-800">{destination.name}</CardTitle>
                      <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                        {destination.state}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{destination.distance} from {currentCity}</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Cost Breakdown */}
                    <div className="bg-gradient-to-r from-orange-50 to-teal-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-800">Total Cost:</span>
                        <span className="text-2xl font-bold text-orange-600">₹{destination.totalCost.toLocaleString()}</span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span className="flex items-center space-x-1">
                            <Train className="w-3 h-3" />
                            <span>Travel:</span>
                          </span>
                          <span>₹{destination.travelCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center space-x-1">
                            <Building className="w-3 h-3" />
                            <span>Hotel/Night:</span>
                          </span>
                          <span>₹{destination.hotelCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center space-x-1">
                            <Utensils className="w-3 h-3" />
                            <span>Food:</span>
                          </span>
                          <span>₹{destination.foodCost.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{destination.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{destination.travelMode}</span>
                      </span>
                    </div>

                    <Separator />

                    {/* Highlights */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>Top Attractions</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-teal-200 text-teal-700">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Hidden Gem */}
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-gray-800 mb-1 flex items-center space-x-2">
                        <Coffee className="w-4 h-4 text-yellow-600" />
                        <span>Hidden Gem 💎</span>
                      </h4>
                      <p className="text-sm text-gray-700">{destination.hiddenGem}</p>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white">
                      <Camera className="w-4 h-4 mr-2" />
                      Plan This Trip
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Budget Tips */}
            <Card className="mt-12 bg-gradient-to-r from-teal-50 to-orange-50 border-teal-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>Budget Travel Tips</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="space-y-2">
                    <p className="flex items-start space-x-2">
                      <span className="text-teal-600">💰</span>
                      <span>Book trains in advance for better rates</span>
                    </p>
                    <p className="flex items-start space-x-2">
                      <span className="text-teal-600">🏨</span>
                      <span>Consider homestays for authentic experiences</span>
                    </p>
                    <p className="flex items-start space-x-2">
                      <span className="text-teal-600">🍽️</span>
                      <span>Try local street food for budget-friendly meals</span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-start space-x-2">
                      <span className="text-orange-600">🎒</span>
                      <span>Travel during off-season for better deals</span>
                    </p>
                    <p className="flex items-start space-x-2">
                      <span className="text-orange-600">🚍</span>
                      <span>Use public transport within cities</span>
                    </p>
                    <p className="flex items-start space-x-2">
                      <span className="text-orange-600">📱</span>
                      <span>Download offline maps to save data</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <MadeWithApplaa />
    </div>
  );
}

// Add missing Clock import
const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);