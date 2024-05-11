-- Globals

-- DROP TABLES

DROP TABLE IF EXISTS student_team, tutor_team, answers, questionnaire_round, alternative, questions, questionnaire, round, team, cesim_game, country, University, Tutor, student, "User" CASCADE;

-- Table 'User'

CREATE TABLE "User" (
  id SERIAL PRIMARY KEY,
  age INTEGER,
  phone_number INTEGER,
  gender VARCHAR,
  nationality VARCHAR,
  email VARCHAR,
  name VARCHAR,
  rol VARCHAR,
  password VARCHAR
);

-- Table 'student'

CREATE TABLE student (
  id SERIAL PRIMARY KEY,
  Social_media TEXT,
  One_word TEXT,
  About_me TEXT,
  id_University INTEGER,
  id_country INTEGER,
  id_User INTEGER,
  id_answers INTEGER,
  FOREIGN KEY (id_University) REFERENCES University(id),
  FOREIGN KEY (id_country) REFERENCES country(id),
  FOREIGN KEY (id_User) REFERENCES "User"(id),
  FOREIGN KEY (id_answers) REFERENCES answers(id)
);

-- Table 'Tutor'

CREATE TABLE Tutor (
  id SERIAL PRIMARY KEY,
  id_country INTEGER,
  id_User INTEGER,
  FOREIGN KEY (id_country) REFERENCES country(id),
  FOREIGN KEY (id_User) REFERENCES "User"(id)
);

-- Table 'University'

CREATE TABLE University (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  id_country INTEGER,
  FOREIGN KEY (id_country) REFERENCES country(id)
);

-- Table 'country'

CREATE TABLE country (
  id SERIAL PRIMARY KEY,
  country VARCHAR,
  city VARCHAR
);

-- Table 'team'

CREATE TABLE team (
  id SERIAL PRIMARY KEY,
  color VARCHAR,
  id_cesim_game INTEGER,
  id_student_team INTEGER,
  id_tutor_team INTEGER,
  FOREIGN KEY (id_cesim_game) REFERENCES cesim_game(id),
  FOREIGN KEY (id_student_team) REFERENCES student_team(id),
  FOREIGN KEY (id_tutor_team) REFERENCES tutor_team(id)
);

-- Table 'cesim_game'

CREATE TABLE cesim_game (
  id SERIAL PRIMARY KEY,
  startdate INTEGER,
  enddate INTEGER
);

-- Table 'round'

CREATE TABLE round (
  id SERIAL PRIMARY KEY,
  startdate INTEGER,
  enddate INTEGER,
  round_number INTEGER,
  id_cesim_game INTEGER,
  FOREIGN KEY (id_cesim_game) REFERENCES cesim_game(id)
);

-- Table 'questionnaire'

CREATE TABLE questionnaire (
  id SERIAL PRIMARY KEY,
  nome VARCHAR,
  quest_category VARCHAR,
  id_questions INTEGER,
  FOREIGN KEY (id_questions) REFERENCES questions(id)
);

-- Table 'questions'

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  description TEXT,
  id_questionnaire INTEGER,
  FOREIGN KEY (id_questionnaire) REFERENCES questionnaire(id)
);

-- Table 'alternative'

CREATE TABLE alternative (
  id SERIAL PRIMARY KEY,
  description TEXT,
  id_questions INTEGER,
  id_answers INTEGER,
  FOREIGN KEY (id_questions) REFERENCES questions(id),
  FOREIGN KEY (id_answers) REFERENCES answers(id)
);

-- Table 'questionnaire_round'

CREATE TABLE questionnaire_round (
  id SERIAL PRIMARY KEY,
  id_questionnaire INTEGER,
  id_round INTEGER,
  FOREIGN KEY (id_questionnaire) REFERENCES questionnaire(id),
  FOREIGN KEY (id_round) REFERENCES round(id)
);

-- Table 'answers'

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  id_questions INTEGER,
  id_round INTEGER,
  FOREIGN KEY (id_questions) REFERENCES questions(id),
  FOREIGN KEY (id_round) REFERENCES round(id)
);

-- Table 'student_team'

CREATE TABLE student_team (
  id SERIAL PRIMARY KEY,
  id_team INTEGER,
  id_student INTEGER,
  FOREIGN KEY (id_team) REFERENCES team(id),
  FOREIGN KEY (id_student) REFERENCES student(id)
);

-- Table 'tutor_team'

CREATE TABLE tutor_team (
  id SERIAL PRIMARY KEY,
  id_Tutor INTEGER,
  id_team INTEGER,
  FOREIGN KEY (id_Tutor) REFERENCES Tutor(id),
  FOREIGN KEY (id_team) REFERENCES team(id)
);

-- Table 'questionnaire_student'

CREATE TABLE questionnaire_student (
  id SERIAL PRIMARY KEY,
  id_studentSender INTEGER,
  id_studentReceiver INTEGER,
  id_questionnaire INTEGER,
  FOREIGN KEY (id_studentSender) REFERENCES student(id),
  FOREIGN KEY (id_studentReceiver) REFERENCES student(id),
  FOREIGN KEY (id_questionnaire) REFERENCES questionnaire(id)
);

