import React from 'react';

// Интерфейсы и типы
export interface Param {
  id: number;
  name: string;
  type: 'string'; 
}

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Model {
  paramValues: ParamValue[];
  colors?: any[]; // Для полноты интерфейса оставляем colors, но он не используется в данном редакторе
}

export interface Props {
  params: Param[];
  model: Model;
}

// Состояние компонента: хранение значений параметров по их id
interface State {
  paramValues: { [key: number]: string };
}

// Компонент для редактирования модели
export class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Инициализируем состояние на основе переданной модели.
    const paramValues: { [key: number]: string } = {};
    props.params.forEach(param => {
      const existingValue = props.model.paramValues.find(pv => pv.paramId === param.id);
      paramValues[param.id] = existingValue ? existingValue.value : '';
    });

    this.state = {
      paramValues,
    };
  }

  // Обработчик изменения значения текстового поля
  handleInputChange = (paramId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    this.setState(prevState => ({
      paramValues: {
        ...prevState.paramValues,
        [paramId]: newValue,
      },
    }));
  };

  // Метод, возвращающий актуальную модель с проставленными значениями параметров
  public getModel(): Model {
    const updatedParamValues: ParamValue[] = this.props.params.map(param => ({
      paramId: param.id,
      value: this.state.paramValues[param.id] || '',
    }));

    return {
      ...this.props.model, // сохраняем остальные свойства модели, например, colors
      paramValues: updatedParamValues,
    };
  }

  render() {
    return (
      <div>
        {this.props.params.map(param => (
          <div key={param.id} style={{ marginBottom: '8px' }}>
            <label htmlFor={`param-${param.id}`} style={{ marginRight: '8px' }}>
              {param.name}:
            </label>
            <input
              id={`param-${param.id}`}
              type="text"
              value={this.state.paramValues[param.id]}
              onChange={(e) => this.handleInputChange(param.id, e)}
            />
          </div>
        ))}
      </div>
    );
  }
}

