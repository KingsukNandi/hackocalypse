import React from 'react';

const survivalTips = [
  {
    title: "Water Purification",
    content: "Always boil water for at least 10 minutes. Use water purification tablets if available."
  },
  {
    title: "First Aid",
    content: "Keep a basic first aid kit. Learn how to treat wounds, prevent infection, and manage basic medical emergencies."
  }
];

function SurvivalGuide() {
  return (
    <div>
      <h2>Survival Guide</h2>
      {survivalTips.map((tip, index) => (
        <div key={index}>
          <h3>{tip.title}</h3>
          <p>{tip.content}</p>
        </div>
      ))}
    </div>
  );
}

export default SurvivalGuide;