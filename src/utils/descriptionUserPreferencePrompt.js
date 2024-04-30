const descriptionUserPreferencePrompt = (
  generatedDescriptions,
  contentType,
  additionalUserInfoValue
) => {
  const generateRefinedDescriptionPrompt = `"Refine the descriptions based on user preferences to better target the audience and highlight key aspects of the video.
   
        Descriptions(Input): ${generatedDescriptions
          ?.map((descObj) => descObj.description)
          ?.join("\n")}

        User Preferences:
                Focus Areas: ${contentType?.join(",")}
                Additional Information:  ${additionalUserInfoValue}
        
 
 Important: Do not provide any explanations, only provide a RFC8259 complaint JSON response following the below example format without deviation.
  
        Example: 
          
                  Descriptions(input) :  

                            [{"description": "Ever craved delicious homemade pizza but dreaded the thought of making dough? Look no further! This comprehensive guide walks you through the process of creating perfect pizza dough from scratch,  suitable even for beginners.

                            In this video, you'll learn:
                            
                            Simple ingredients and easy-to-follow steps for foolproof pizza dough making.
                            Essential tips for achieving a golden-brown, crispy crust and a fluffy, airy center.
                            Troubleshooting common pizza dough mistakes to ensure success every time.
                            Bonus: We'll share some expert secrets for a restaurant-worthy pizza experience at home!
                            Get ready to impress your family and friends with your newfound pizza-making skills! Don't forget to like and subscribe for more delicious recipe ideas. Check out our website [website link] for even more pizza inspiration! ",
                                "type": "Character count- Approximately 450 words"}
                            ]   

                  User Preferences(input):
                            Focus Areas: Time-saving tips for busy cooks, Beginners
                            Additional Information: none.
          
                      Generated Descriptions(output):
                  
                            [{"description": "Ever craving delicious homemade pizza but short on time? This video is your ultimate guide to making perfect pizza dough in a flash! We know beginners might be pressed for time, so we've packed this video with hacks and shortcuts to get you from zero to pizza perfection in no time.

                            In this video, you'll learn:
                            
                            Super-speedy dough prep methods that cut down on rising time without compromising on taste or texture.
                            Smart ingredient swaps that save you a trip to the store and minimize prep work.
                            Easy troubleshooting tips to avoid common mistakes that slow you down.
                            Bonus: We'll share a foolproof schedule for making pizza dough ahead of time, so you can have fresh pizza ready whenever the craving hits!
                            Get ready to impress your family and friends with your newfound pizza-making skills, even on a busy schedule! Don't forget to like and subscribe for more time-saving recipe ideas.",
                            "type": "Character count- Approximately 450 words"}
                            ]"`;

  return generateRefinedDescriptionPrompt;
};

export default descriptionUserPreferencePrompt;
