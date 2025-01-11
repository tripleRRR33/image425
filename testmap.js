import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  Save, 
  Trash2, 
  Tag, 
  FileText,
  Globe, 
  Compass, 
  Map, 
  Calendar, 
  Users,
  Book,
  Bookmark,
  Building
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ReactDOM from 'react-dom';

const WorldbuildingApp = () => {
  const initialCategories = [
    {
      id: 1,
      name: 'Géographie Physique',
      icon: <Globe className="w-4 h-4" />,
      subcategories: [
        { 
          id: 'geo-1',
          name: 'Climats & Météo',
          icon: <Compass className="w-4 h-4" />,
          properties: ['température', 'précipitations', 'vents', 'saisons']
        },
        { 
          id: 'geo-2',
          name: 'Relief & Topographie',
          icon: <Map className="w-4 h-4" />,
          properties: ['altitude', 'type', 'composition', 'âge']
        },
        { 
          id: 'geo-3',
          name: 'Écosystèmes',
          icon: <Globe className="w-4 h-4" />,
          properties: ['type', 'biodiversité', 'endémisme', 'menaces']
        }
      ]
    },
    {
      id: 2,
      name: 'Civilisations',
      icon: <Building className="w-4 h-4" />,
      subcategories: [
        {
          id: 'civ-1',
          name: 'Structure Sociale',
          icon: <Users className="w-4 h-4" />,
          properties: ['classes', 'hiérarchie', 'mobilité', 'traditions']
        },
        {
          id: 'civ-2',
          name: 'Politique',
          icon: <Bookmark className="w-4 h-4" />,
          properties: ['système', 'institutions', 'lois', 'relations']
        },
        {
          id: 'civ-3',
          name: 'Économie',
          icon: <Building className="w-4 h-4" />,
          properties: ['ressources', 'commerce', 'monnaie', 'technologies']
        }
      ]
    },
    {
      id: 3,
      name: 'Culture',
      icon: <Book className="w-4 h-4" />,
      subcategories: [
        {
          id: 'cul-1',
          name: 'Langues',
          icon: <FileText className="w-4 h-4" />,
          properties: ['famille', 'écriture', 'dialectes', 'évolution']
        },
        {
          id: 'cul-2',
          name: 'Arts & Littérature',
          icon: <Book className="w-4 h-4" />,
          properties: ['formes', 'styles', 'influences', 'périodes']
        },
        {
          id: 'cul-3',
          name: 'Religion & Mythologie',
          icon: <Compass className="w-4 h-4" />,
          properties: ['panthéon', 'rituels', 'croyances', 'textes']
        }
      ]
    },
    {
      id: 4,
      name: 'Histoire',
      icon: <Calendar className="w-4 h-4" />,
      subcategories: [
        {
          id: 'his-1',
          name: 'Époques',
          icon: <Calendar className="w-4 h-4" />,
          properties: ['début', 'fin', 'caractéristiques', 'événements']
        },
        {
          id: 'his-2',
          name: 'Conflits',
          icon: <Users className="w-4 h-4" />,
          properties: ['belligérants', 'causes', 'durée', 'conséquences']
        },
        {
          id: 'his-3',
          name: 'Développements',
          icon: <Bookmark className="w-4 h-4" />,
          properties: ['domaine', 'impact', 'origines', 'propagation']
        }
      ]
    }
  ];

  const [categories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedSubcategory, setSelectedSubcategory] = useState('geo-1');
  const [elements, setElements] = useState({});
  const [relationships, setRelationships] = useState([]);
  const [activeView, setActiveView] = useState('edit');

  const [elementForm, setElementForm] = useState({
    name: '',
    description: '',
    tags: [],
    properties: {},
    relationships: [],
    coordinates: { x: 0, y: 0 }
  });

  const handleAddElement = () => {
    if (!elementForm.name.trim()) return;

    const newElement = {
      id: Date.now(),
      categoryId: selectedCategory,
      subcategoryId: selectedSubcategory,
      ...elementForm,
      created: new Date().toISOString(),
      modified: new Date().toISOString()
    };

    setElements(prev => ({
      ...prev,
      [selectedSubcategory]: [...(prev[selectedSubcategory] || []), newElement]
    }));

    setElementForm({
      name: '',
      description: '',
      tags: [],
      properties: {},
      relationships: [],
      coordinates: { x: 0, y: 0 }
    });
  };

  const handleSaveWorld = () => {
    const worldData = {
      categories,
      elements,
      relationships
    };
    localStorage.setItem('worldbuilding-data', JSON.stringify(worldData));
    alert('Monde sauvegardé !');
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Card className="mb-6">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Créateur de Monde</CardTitle>
            <div className="flex gap-2">
              <button
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
                onClick={handleSaveWorld}
              >
                <Save size={20} />
                Sauvegarder
              </button>
              <button
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                onClick={() => {
                  const worldData = { categories, elements, relationships };
                  const blob = new Blob([JSON.stringify(worldData, null, 2)]);
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'monde.json';
                  a.click();
                }}
              >
                <FileText size={20} />
                Exporter
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3 border-r pr-4">
              {categories.map(category => (
                <div key={category.id} className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    {category.icon}
                    <h3 className="font-bold">{category.name}</h3>
                  </div>
                  <ul className="space-y-1">
                    {category.subcategories.map(sub => (
                      <li
                        key={sub.id}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100 ${
                          selectedSubcategory === sub.id ? 'bg-blue-100' : ''
                        }`}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setSelectedSubcategory(sub.id);
                        }}
                      >
                        {sub.icon}
                        <span>{sub.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="col-span-9">
              <div className="flex gap-4 mb-4">
                <button
                  className={`p-2 rounded ${activeView === 'edit' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveView('edit')}
                >
                  Édition
                </button>
                <button
                  className={`p-2 rounded ${activeView === 'relationships' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveView('relationships')}
                >
                  Relations
                </button>
              </div>

              {activeView === 'edit' && (
                <Card className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      className="p-2 border rounded"
                      placeholder="Nom de l'élément"
                      value={elementForm.name}
                      onChange={(e) => setElementForm(prev => ({...prev, name: e.target.value}))}
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 p-2 border rounded"
                        placeholder="Ajouter un tag..."
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && e.target.value) {
                            setElementForm(prev => ({
                              ...prev,
                              tags: [...prev.tags, e.target.value]
                            }));
                            e.target.value = '';
                          }
                        }}
                      />
                      <button className="p-2 border rounded">
                        <Tag size={20} />
                      </button>
                    </div>
                  </div>

                  <textarea
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Description détaillée..."
                    rows="4"
                    value={elementForm.description}
                    onChange={(e) => setElementForm(prev => ({...prev, description: e.target.value}))}
                  />

                  <button
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2"
                    onClick={handleAddElement}
                  >
                    <Plus size={20} />
                    Ajouter
                  </button>
                </Card>
              )}

              <div className="mt-4 space-y-4">
                {elements[selectedSubcategory]?.map(element => (
                  <Card key={element.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{element.name}</h3>
                        <p className="text-gray-600">{element.description}</p>
                        {element.tags?.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {element.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setElements(prev => ({
                            ...prev,
                            [selectedSubcategory]: prev[selectedSubcategory].filter(el => el.id !== element.id)
                          }));
                        }}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

ReactDOM.render(<WorldbuildingApp />, document.getElementById('root'));
