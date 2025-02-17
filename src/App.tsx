import React, { useRef } from 'react';
import './App.css';
import { ParamEditor, Param, Model } from './Components/ParamEditor';

const App: React.FC = () => {
  // Пример данных
  const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
  };

  // Используем ref для доступа к методу getModel()
  const editorRef = useRef<ParamEditor>(null);

  const handleSubmit = () => {
    if (editorRef.current) {
      const updatedModel = editorRef.current.getModel();
      console.log('Обновленная модель:', updatedModel);
      alert(JSON.stringify(updatedModel, null, 2));
    }
  };

  return (
    <div className="App">
      <h1>Редактор параметров товара</h1>
      <ParamEditor ref={editorRef} params={params} model={model} />
      <button onClick={handleSubmit}>Получить модель</button>
    </div>
  );
};

export default App;
