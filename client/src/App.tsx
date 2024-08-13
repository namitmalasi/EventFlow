import { Button, Input } from "antd";
import ThemeProvider from "./theme";
function App() {
  return (
    <ThemeProvider>
      <div className="h-screen flex justify-center items-center flex-col p-5 gap-5">
        <h1 className="text-gray-600 text-3xl">Homepage</h1>

        <Button type="primary">Primary Button</Button>
        <Input placeholder="enter text" />
      </div>
    </ThemeProvider>
  );
}

export default App;
