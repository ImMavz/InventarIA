import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    this.genAI = new GoogleGenerativeAI(apiKey || '');
  }

  async getConsult(prompt: string, inventoryContext: string) {
    try {
      // 1. Usamos el modelo exacto que encontraste
      const model = this.genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash-lite" 
      });

      const systemPrompt = `Eres un experto en gestión de inventarios.
      Inventario actual:
      ${inventoryContext}`;

      // 2. Formato de mensaje compatible con 2.0
      const result = await model.generateContent([
        { text: systemPrompt },
        { text: `Pregunta del usuario: ${prompt}` }
      ]);

      const response = result.response;
      return { response: response.text() };

    } catch (error) {
      console.error('Error con Gemini 2.0:', error);
      return { 
        response: "Parece que el modelo 2.0 está ocupado o la configuración cambió. Intenta de nuevo en un momento." 
      };
    }
  }
}