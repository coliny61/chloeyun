import React, { useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function Blog() {
  const [selectedTag, setSelectedTag] = useState("all");

  const tags = [
    { key: "all", name: "All Articles" },
    { key: "restaurants", name: "Dining" },
    { key: "travel", name: "Travel" },
    { key: "fashion", name: "Fashion" },
    { key: "lifestyle", name: "Lifestyle" },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Dallas's Premier Rooftop Experiences for Spring",
      excerpt:
        "As the season transitions, discover the sophisticated rooftop venues that define Dallas's elevated dining and social scene.",
      image:
        "https://images.unsplash.com/photo-1668000305847-cf422c116bf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXN0YXVyYW50JTIwRGFsbGFzJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc1NTcyMTgwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "2024-03-15",
      readTime: "5 min read",
      tags: ["restaurants", "lifestyle"],
    },
    {
      id: 2,
      title: "European Luxury: A Refined Travel Experience",
      excerpt:
        "An intimate look at curating the perfect European journey, from exclusive accommodations to private cultural experiences.",
      image:
        "https://images.unsplash.com/photo-1755514838747-adfd34197d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjBmYXNoaW9uJTIwY29udGVudCUyMGNyZWF0b3J8ZW58MXx8fHwxNzU1NzIxODA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "2024-03-10",
      readTime: "8 min read",
      tags: ["travel", "lifestyle"],
    },
    {
      id: 3,
      title:
        "Investment Dressing: Building an Enduring Wardrobe",
      excerpt:
        "The art of selecting luxury pieces that transcend trends, offering timeless elegance and exceptional craftsmanship.",
      image:
        "https://images.unsplash.com/photo-1656789280583-c5bebda7ca1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbGlmZXN0eWxlJTIwZmxhdCUyMGxheSUyMGx1eHVyeXxlbnwxfHx8fDE3NTU3MjE4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "2024-03-05",
      readTime: "6 min read",
      tags: ["fashion", "lifestyle"],
    },
    {
      id: 4,
      title: "Dallas Culinary Treasures: An Insider's Guide",
      excerpt:
        "Beyond the well-known establishments lies a world of exceptional dining experiences known only to discerning locals.",
      image:
        "https://images.unsplash.com/photo-1668000305847-cf422c116bf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXN0YXVyYW50JTIwRGFsbGFzJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc1NTcyMTgwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "2024-02-28",
      readTime: "4 min read",
      tags: ["restaurants", "lifestyle"],
    },
  ];

  const filteredPosts =
    selectedTag === "all"
      ? blogPosts
      : blogPosts.filter((post) =>
          post.tags.includes(selectedTag),
        );

  return (
    <div className="min-h-screen bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-serif text-stone-900 mb-4">
            Lifestyle Journal
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Thoughtful perspectives on luxury living, refined
            experiences, and sophisticated culture
          </p>
        </motion.div>

        {/* Tag Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {tags.map((tag) => (
            <button
              key={tag.key}
              onClick={() => setSelectedTag(tag.key)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedTag === tag.key
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {tag.name}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {/* Featured Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center space-x-4 text-sm text-stone-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>
                        {new Date(post.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif text-stone-900 mb-3 group-hover:text-stone-700 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-stone-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-stone-100 text-stone-600 text-xs rounded-full capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <div className="flex items-center text-stone-900 group-hover:text-stone-700 transition-colors">
                    <span className="font-medium">
                      Continue Reading
                    </span>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      className="ml-2"
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}