import { forwardRef } from "react";
import { Form } from "react-bootstrap";
import { NumericFormat } from "react-number-format";

function InputNumber(props, ref) {
  return (
    <NumericFormat
      {...props}
      onChange={() => null}
      onValueChange={({ floatValue }) =>
        props.onChange({ target: { name: props.name, value: floatValue } })
      }
      getInputRef={ref}
      customInput={Form.Control} // ui만 담당하는 컴포넌트가 필요하면 넘김.
    />
  );
}

export default forwardRef(InputNumber);
