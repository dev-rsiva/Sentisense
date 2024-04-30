const descriptionPrompt = (topicRefValue, competitorDescriptions) => {
  const generateDescriptionPrompt = `"Generate a comprehensive, SEO-Optimized YouTube description for your video, incorporating the following strategies:

        1. Utilize Keywords: Prioritize keywords and phrases found in the competitor descriptions, while also considering your video topic. Use a mix of broad and long-tail keywords for search optimization.

            Competitor Descriptions:
                  ${
                    competitorDescriptions === ""
                      ? "Not available"
                      : competitorDescriptions
                  }

            Topic: ${topicRefValue}

        2. Informative and Engaging Content: Craft a description that accurately describes your video content, highlights key points, and piques viewers' interest.
        3. Call to Action: Encourage viewers to like, subscribe, and leave comments to boost engagement.
        4. Links (Optional): Include relevant links to your website, social media channels, or additional resources mentioned in the video (within character limit).
        5. Structure and Readability: Break down the description into easy-to-read paragraphs with bullet points or numbered lists for key takeaways.
        6. Character Limit: Aim for a description that falls within the 5000-character limit, leaving room for potential truncation.
        7. Important: Do not provide any explanations, only provide a RFC8259 complaint JSON response following the below example format without deviation.
  
        Example:
  
            User Input:

                Competitor Descriptions:
                        "Learn how to make the perfect pizza dough from scratch! This easy recipe is perfect for beginners and takes only minutes to prepare. Get ready to impress your friends and family with your homemade pizza skills!"
                        "Ultimate Pizza Dough Recipe - Tired of store-bought dough? This video guides you through every step of creating delicious homemade pizza dough that's guaranteed to elevate your pizzas! Plus, we'll share some pro tips for a crispy crust."
                        "Pizza dough secrets you never knew! In this video, we reveal surprising yet simple techniques to take your pizza dough to the next level. Learn how to achieve the perfect texture, prevent common mistakes, and create restaurant-quality pizza at home!"
                
                Topic: Making Pizza Dough
  
            Generated Descriptions:
  
                [{"description": "Ever craved delicious homemade pizza but dreaded the thought of making dough? Look no further! This comprehensive guide walks you through the process of creating perfect pizza dough from scratch,  suitable even for beginners.

                In this video, you'll learn:
                
                Simple ingredients and easy-to-follow steps for foolproof pizza dough making.
                Essential tips for achieving a golden-brown, crispy crust and a fluffy, airy center.
                Troubleshooting common pizza dough mistakes to ensure success every time.
                Bonus: We'll share some expert secrets for a restaurant-worthy pizza experience at home!
                Get ready to impress your family and friends with your newfound pizza-making skills! Don't forget to like and subscribe for more delicious recipe ideas. Check out our website [website link] for even more pizza inspiration! ",
                    "type": "Character count- Approximately 450 words"}
                ]
                "`;

  return generateDescriptionPrompt;
};

export default descriptionPrompt;

// Competitor Description:
//       ${
//         competitorDescription === ""
//           ? "Not available"
//           : competitorDescription
//       }

// Topic: ${topicRefValue}
