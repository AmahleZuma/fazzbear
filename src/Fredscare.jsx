export default function jumpScare() {

  function fredScare() {
      alert('Freddy has killed you')
  }


  return (
    <button onClick={fredScare}>
      Door
    </button>
  );
}
