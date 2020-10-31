// Сообщения ошибок
const ID = 'Неверный  ID';
const CAST_ERR = 'ID не найден';
const EMPTY_FIELD = 'Строка не заполнена';
const KEYWORD = 'Ключевое слово отсутствует';
const DATE = 'Нет даты';
const TEXT = 'Нет текста';
const TITLE = 'Нет заголовка';
const SOURCE = 'Нет источника';
const NAME = 'Поле должно содержать от 3 до 20 символов';
const EMAIL = 'Email некорректный';
const EMAIL_USE = 'Этот email уже используется';
const PASSWORD_SIGNUP = 'Пароль должен содержать строчные и прописные буквы, цифры и специальные символы. Минимум 8 символов';
const PASSWORD = 'Пароль должен содержать не менее 8 символов';
const URL = 'Неверный адрес';
const ARTICLE_MISSING = 'Статья отсутствует';
const ARTICLE_PERMISSION = 'Вы не можете удалить чужую статью';
const NO_USER = 'Такого пользователя не существует';
const AUTH = 'Требуется авторизация';
const TRIM = 'Пробелы не допускаются';
const INCORRECT_LOGIN = 'Неверный адрес электронной почты или пароль';
const NOT_FOUND = 'Запрашиваемый ресурс не найден';

module.exports = {
  NOT_FOUND,
  INCORRECT_LOGIN,
  TRIM,
  CAST_ERR,
  EMAIL_USE,
  AUTH,
  NO_USER,
  ARTICLE_MISSING,
  ARTICLE_PERMISSION,
  ID,
  DATE,
  EMAIL,
  EMPTY_FIELD,
  KEYWORD,
  NAME,
  PASSWORD,
  SOURCE,
  TEXT,
  TITLE,
  PASSWORD_SIGNUP,
  URL,
};
