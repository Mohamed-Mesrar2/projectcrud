<?php

namespace App\Http\Controllers;
use Validator;
use Illuminate\Http\Request;
use App\Models\Impression; // Import the model correctly

class ImpressionController extends Controller
{
    public function index()
    {
        $impressions = Impression::all(); // Use the correct model class name
        return response()->json($impressions);
    }




    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Date' => 'required',
            'Shift' => 'required',
            'Client' => 'required',
            'N_OF' => 'required',
            'Designation' => 'required',
            'Famille' => 'required',
            'MATRUCULE' => 'required',
            'Nombre_piste' => 'required',
            'MACHINE' => 'required',
            'QTE' => 'required',
            'METRAGE' => 'required'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        $cat = new Impression(); // Use the correct model name
        $cat->Date = $request->input('Date');
        $cat->Shift = $request->input('Shift');
        $cat->Client = $request->input('Client');
        $cat->N_OF = $request->input('N_OF');
        $cat->Designation = $request->input('Designation');
        $cat->Famille = $request->input('Famille');
        $cat->MATRUCULE = $request->input('MATRUCULE');
        $cat->Nombre_piste = $request->input('Nombre_piste');
        $cat->MACHINE = $request->input('MACHINE');
        $cat->QTE = $request->input('QTE');
        $cat->METRAGE = $request->input('METRAGE');
    
        $cat->save();
    
        return response()->json(['message' => 'Catégorie bien créée!']);
    }





    public function show($N_OF)
    {
        $impression = Impression::find($N_OF);
        $impression = Impression::where('N_OF', $N_OF)->get();

        if (!$impression) {
            return response()->json(['message' => 'Impression not found'], 404);
        }

        return response()->json($impression);
    }


    public function destroy($id){ 
        $cat = Impression::find($id); 
        if($cat){ 
          $cat->delete(); 
          return response()->json(['message' => ' bien supprimée']); 
        }else{ 
          return response()->json(['error' => ' non 
    trouvée'], 404); 
        } 
      } 
    } 





