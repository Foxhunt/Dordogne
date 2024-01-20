export default function Lighting() {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[0, 0, 0]} intensity={100} />
      <pointLight position={[0, 10, 0]} intensity={10} />
      <pointLight position={[0, -10, 0]} intensity={10} />
      <pointLight position={[0, 20, 0]} intensity={10} />
      <pointLight position={[0, -20, 0]} intensity={10} />
      <pointLight position={[0, 30, 0]} intensity={10} />
      <pointLight position={[0, -30, 0]} intensity={10} />
      <pointLight position={[0, 10, 0]} intensity={10} />
      <pointLight position={[0, -10, 0]} intensity={10} />
      <pointLight position={[10, 0, 0]} intensity={10} />
      <pointLight position={[-10, 0, 0]} intensity={10} />
      <pointLight position={[0, 0, 10]} intensity={10} />
      <pointLight position={[0, 0, -10]} intensity={10} />
    </>
  );
}
