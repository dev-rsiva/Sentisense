const tagsPrompt = (topicRefValue, competitorTitles) => {
  const generateTagPrompt = `"Incorporate the following keywords & competitor Titles and Generate A list of 10 relevant and concise tags(separated by commas) for a YouTube video:

            Competitor Titles:
                  ${
                    competitorTitles === "" ? "Not available" : competitorTitles
                  }

            Keywords: ${topicRefValue}

  Important: Do not provide any explanations, only provide a RFC8259 complaint JSON response following the below example format without deviation.

        Example:
  
        Incorporate the following keywords into relevant and concise tags for a YouTube video:

        * Keywords: swimming, beginners, pool, sea, techniques, safety tips, gear
        * Video Title: Learn to Swim for Beginners: Essential Techniques & Safety Tips
        
        **Output:**
        
        {"tags": [swimming, beginners, learn to swim, swimming pool, ocean swimming, swimming techniques, safety tips for swimming, swimming gear, how to swim, swimming lessons]}
                "`;

  return generateTagPrompt;
};

export default tagsPrompt;

// Competitor Description:
//       ${
//         competitorDescription === ""
//           ? "Not available"
//           : competitorDescription
//       }

// Topic: ${topicRefValue}
