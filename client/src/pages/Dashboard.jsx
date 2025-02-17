import Questionnaire from "../components/Questionnaire";
import ChatInput from "../components/ChatInput";

const Dashboard = () => {
  return (
    <div className="flex flex-row justify-around bottom-0 left-0 right-0 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 px-10 py-6 overflow-auto">
      <ChatInput/>
      <Questionnaire/>       
    </div>
  )
}

export default Dashboard;