import Note from "../components/NoteViewer";
import NoteList from "../components/NoteList";

const Home = () => {
  return (
    <div className="flex w-full h-full">
      <NoteList />
      <Note />
    </div>
  );
};

export default Home;
