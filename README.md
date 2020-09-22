# news-explorer-api

### Создание схемы и модели ресурсов API
 В проекте две сущности: пользователя и статьи (user и article). Создайте схему и модель для каждой.

## Поля схемы user.
* email — почта пользователя, по которой он регистрируется. Это обязательное поле, уникальное для каждого пользователя. Также оно должно валидироваться на соответствие схеме электронной почты.
* password — хеш пароля. Обязательное поле-строка. Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле.
* name — имя пользователя, например: Александр или Мария. Это обязательное поле-строка от 2 до 30 символов.

### Поля схемы article
* keyword — ключевое слово, по которому статью нашли. Обязательное поле-строка.
* title — заголовок статьи. Обязательное поле-строка.
* text — текст статьи. Обязательное поле-строка.
* date — дата статьи. Обязательное поле-строка.
* source — источник статьи. Обязательное поле-строка.
* link — ссылка на статью. Обязательное поле-строка. Должно быть URL-адресом.
* image — ссылка на иллюстрацию к статье. Обязательное поле-строка. Должно быть URL-адресом.
* owner — _id пользователя, сохранившего статью. Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле.

### Роуты и контроллеры
В API 4 роута:
* GET /users/me - возвращает информацию о пользователе (email и имя)
* GET /articles - возвращает все сохранённые пользователем статьи
* POST /articles - создаёт статью с переданными в теле keyword, title, text, date, source, link и image
* DELETE /articles/articleId - удаляет сохранённую статью  по _id

(Контроллер для каждого роута. Защита роутов авторизацией: если клиент не прислал JWT, доступ к роутам ему должен быть закрыт.)


### Реализация аутентификации и авторизации
В API ещё два роута: для регистрации и логина:
* POST /signup - создаёт пользователя с переданными в теле email, password и name
* POST /signin - проверяет переданные в теле почту и пароль и возвращает JWT

### Логгирование
#### Два лога:
* request.log, чтобы хранить информацию о всех запросах к API;
* error.log, чтобы хранить информацию об ошибках, которые возвращало API.
* Логи должны быть в формате JSON. Файлы логов не должны добавляться в репозиторий.


### Несколько советов
* Хранение паролей в зашифрованном виде.
* Валидация данных, которые приходят в теле и параметрах запроса. Если с телом что-то не так, обработка запроса вообще не должна передаваться в контроллер. Клиенту при этом следует вернуть ошибку.
* Обработка ошибки централизованно. В конце файла app.js создан для этого мидлвэр. При возникновении ошибок, не возвращайте их клиенту. Вместо этого передавайте обработку в централизованный мидлвэр.
* Внимательное отношение к статусам ошибок. Пригодятся: 200, 201, 400, 401, 404, 500.
* У пользователя нет возможности удалять статьи других пользователей.