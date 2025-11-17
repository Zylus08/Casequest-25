import React from "react";
import "./Rulebook.css";
import bgImage from "./bgImg2.jpg"; // ✅ correct local import

export const Rulebook = () => {
  return (
    <div
      className="rulebook-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="rulebook-content">
        <h1 className="title">
          <span className="crest">❖</span>
          Rulebook
          <span className="crest">❖</span>
        </h1>
        <p className="subtitle">By Order of the Thapar Venture Club</p>
        <div className="divider" />
        <div className="scroll-panel">
          <div className="rules">
            <p><strong>1.</strong> Teams can be formed across different academic years and disciplines but must adhere to a 3–4 member structure.</p>

            <p><strong>2.</strong> Each participant is permitted to join only one team. Teams found violating this rule will be immediately disqualified.</p>

            <p><strong>3.</strong> Teams are required to register through the Saturnalia’25 Registration Portal / Unstop Portal by 14th November 2025. Incomplete or incorrect registration information will lead to disqualification.</p>

            <p><strong>4.</strong> Registration for Thapar University students is free of cost. External university teams must pay a registration fee of INR 700 per team to participate.</p>

            <p><strong>5.</strong> Each team is required to submit a Pitch Deck in PDF format by the submission deadline. A detailed template and format for submissions will be provided at the beginning of each round to ensure clarity.</p>

            <p><strong>6.</strong> Judges will score teams based on:</p>
            <ul>
              <li>Clarity of Presentation: How well the team conveys its idea.</li>
              <li>Innovation and Creativity: Originality and innovativeness of the solution.</li>
              <li>Market Validation: Strength of customer research and market demand.</li>
            </ul>

            <p><strong>7.</strong> All decisions by the judging panel are final and binding.</p>

            <p><strong>8.</strong> Participants retain full ownership of their ideas and business plans.</p>

            <p><strong>9.</strong> Teams must be present at the awards ceremony to claim their prizes. Failure to do so will result in forfeiture.</p>

            <p><strong>10.</strong> Teams may be disqualified for:</p>
            <ul>
              <li>Plagiarism or intellectual property infringement</li>
              <li>Misconduct or inappropriate behavior during the competition</li>
              <li>Failing to meet submission deadlines or violating competition rules</li>
              <li>Any attempt to manipulate or disrupt the competition in an unfair manner</li>
            </ul>

            <p><strong>11.</strong> The organizers reserve the right to disqualify any team if there are grounds to believe the rules have been violated.</p>

            <p><strong>12.</strong> All media coverage will be coordinated by the Thapar Venture Club's Media Team in collaboration with Saturnalia’25's Media Team. Teams may be asked to participate in interviews, social media promotions, or other publicity activities related to the competition.</p>

            <p><strong>13.</strong> The event is subject to cancellation or modification in the event of unforeseen circumstances.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
