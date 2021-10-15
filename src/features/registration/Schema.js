import * as yup from "yup";

export default function getValidationSchema(arrayOfKeys) {
  const userSchemaObject = {
    password: yup
      .string()
      .required("رمز عبور اجباری است")
      .min(8, "رمز عبور نباید کمتر از ۸ کاراکتر باشد"),

    userName: yup
      .string()
      .required("اسم اجیباری است")
      .min(3, "نام کاربری نباید کمتر از ۳ کاراکتر باشد")
      .max(32, "نام کاربری نباید بیشتر از ۳۲ کاراکتر باشد"),
    captcha: yup
      .string()
      .required("نوشتن محتوای عکس اجباری است")
      .min(5, "نوشته کمتر از ۵ حرف نباید باشد")
      .max(5, "نوشته نباید بیشتر از ۵ حرف باشد"),
    title: yup
      .string()
      .required("عنوان اجباری است")
      .min(3, "نام کاربری نباید کمتر از ۳ کاراکتر باشد")
      .max(32, "نام کاربری نباید بیشتر از ۳۲ کاراکتر باشد"),
    blockchain: yup.string().required("عنوان اجباری است"),
  };
  const keys =
    arrayOfKeys.length === 0 ? Object.keys(userSchemaObject) : arrayOfKeys;

  const shape = keys.reduce((output, currentKey) => {
    output[currentKey] = userSchemaObject[currentKey];
    return output;
  }, {});
  return yup.object().shape(shape);
}
