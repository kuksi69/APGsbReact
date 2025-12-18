import FraisForm from '../components/FraisForm';


function FraisAdd() {
    const handleAdd = async (data) => {
        console.log('Données envoyées :', data);
};


return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Saisir une note frais</h1>
        <FraisForm onSubmit={handleAdd} />
</div>
);
}

export default FraisAdd;