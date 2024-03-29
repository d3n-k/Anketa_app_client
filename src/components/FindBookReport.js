import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import edit from "./../imgs/edit_icon.svg";
import trash from "./../imgs/trash_icon.svg";
import moment from 'moment';
import { deleteAuthorByReport } from "../http/AuthorsApi";
import { deleteBookByReport } from "../http/BooksApi";
import { deleteBookReport } from "../http/BooksReportApi";
moment().format(); 
moment.locale("ru");

const FindBookReport = observer(({ cathId }) => {
  const navigate = useNavigate();

  const { cathedra } = useContext(Context);
  const { user } = useContext(Context);
  const { book } = useContext(Context);

  const deleteReportFunc = (id) => {
    deleteAuthorByReport(id).then(() => {});
    deleteBookByReport(id).then(() => {});
    deleteBookReport(id).then(() => {});
    book.setBookReports([...book.bookReports.filter(el => el.id !== id)]);
  }

  return (
   <Container>
      <div>
      <h4
        style={{ textAlign: "center", marginTop: "3rem", marginBottom: "3rem" }}
      >
        Приложения к отчету кафедры
      </h4>

      {cathedra.open || user.isAuth 
      ? book.bookReports && book.bookReports.length
        ?  <>
          <Button onClick={() => navigate(`/createBook/${cathId}`)} style={{marginBottom: '1.5rem'}} variant="primary" >Создать приложение к отчету кафедры</Button>
          <Row style={{marginBottom: '1rem'}} className="blankHead" >
            <Col md={11}>Дата создания</Col>
          </Row>
         
         { book.bookReports.map((b) => (
         <Row className="us_item" key={b.id}>
            <Col md={11}>
             {moment(b.createdAt).format("DD.MM.YYYY h:mm:ss")}
           </Col>
           <Col style={{display: 'flex'}} md={1}>
             <img onClick={() => navigate(`/book_report/${b.id}`)} className="edit" src={edit} alt="" />
             <img
                   onClick={() => deleteReportFunc(b.id)}
                   style={{
                     height: "30px",
                     marginLeft: "10px",
                     cursor: "pointer",
                   }}
                   src={trash}
                   alt=""
                   />
           </Col>
         </Row>
         ))}
        </>
        : <>
           <Button onClick={() => navigate(`/createBook/${cathId}`)} style={{marginBottom: '1rem'}} variant="primary" >Создать приложение к отчету кафедры</Button>
         <div>
          Приложений к отчету ещё нет!
          </div>
          </>
      : <div>
         У Вас нет доступа!
        </div>
    }
    </div>
   </Container>
  );
});

export default FindBookReport;