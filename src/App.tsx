import FormBuilder from "./components/FormBuilder";
import FormPreview from "./components/FormPreview";

import { FormProvider } from "./contexts/FormContext";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <FormProvider>
        <div className="container mx-auto py-8 px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <FormBuilder />
            <FormPreview />
          </div>
        </div>
      </FormProvider>
    </DndProvider>
  );
};

export default App;
