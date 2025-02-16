import Questionnaire from "../components/Questionnaire";
import ChatInput from "../components/ChatInput";

const Dashboard = () => {
  return (
    <div className="flex flex-row justify-around bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-10 py-6 overflow-auto">
      <ChatInput/>
      <Questionnaire/>       
    </div>
  )
}

export default Dashboard;