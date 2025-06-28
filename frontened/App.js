import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [resume, setResume] = useState({
    name: "John Doe",
    summary: "Experienced developer...",
    education: [],
    experience: [],
    skills: []
  });

  const enhanceSection = async (sectionName) => {
    const response = await axios.post("http://localhost:8000/ai-enhance", {
      section: sectionName,
      content: resume[sectionName]
    });
    setResume({
      ...resume,
      [sectionName]: response.data.enhanced_content
    });
  };

  const saveResume = async () => {
    await axios.post("http://localhost:8000/save-resume", {
      data: resume
    });
    alert("Resume saved.");
  };

  const downloadResume = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "resume.json";
    link.click();
  };

  return (
    <div>
      <h1>Resume Editor</h1>
      <input value={resume.name} onChange={(e) => setResume({ ...resume, name: e.target.value })} />
      <button onClick={() => enhanceSection("summary")}>Enhance Summary</button>
      <textarea value={resume.summary} onChange={(e) => setResume({ ...resume, summary: e.target.value })}></textarea>
      <br />
      <button onClick={saveResume}>Save Resume</button>
      <button onClick={downloadResume}>Download Resume</button>
    </div>
  );
}

export default App;
