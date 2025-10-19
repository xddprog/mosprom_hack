// src/components/charts/SupplyDemandChart.tsx

import { LineChart } from '@mui/x-charts/LineChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'; // Используем ваши Card компоненты

// Тип данных, который мы ожидаем
interface SupplyDemandDTO {
    month: string;
    supply: number;
    demand: number;
}

interface SupplyDemandChartProps {
    data: SupplyDemandDTO[];
}

export const SupplyDemandChart = ({ data }: SupplyDemandChartProps) => {
    // Извлекаем данные в отдельные массивы, как этого ожидает MUI Charts
    const xLabels = data.map(item => item.month);
    const supplyData = data.map(item => item.supply);
    const demandData = data.map(item => item.demand);

    return (
        <Card className="bg-white rounded-xl shadow-none">
            <CardHeader className="pb-0">
                <CardTitle className="text-[#383649] text-lg font-light">
                    Спрос и предложение
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div style={{ width: '100%', height: '256px' }}> {/* 256px = h-64 */}
                    <LineChart
                        // xAxis - настраиваем ось X (месяцы)
                        xAxis={[{ 
                            data: xLabels,
                            scaleType: 'point',
                        }]}
                        
                        // yAxis - настраиваем ось Y (значения)
                        yAxis={[{
                            // min и max можно не задавать, график подберет их автоматически
                            // valueFormatter: (value) => `${value} шт.` // опционально
                        }]}
                        
                        // series - описываем наши две линии
                        series={[
                          {
                            data: demandData,
                            label: 'Спрос',
                            color: '#F59E0B', // Желтый/Оранжевый
                            curve: 'catmullRom', // Сглаживание!
                            showMark: false, // Убираем точки
                          },
                          {
                            data: supplyData,
                            label: 'Предложение',
                            color: '#3B82F6', // Синий
                            curve: 'catmullRom', // Сглаживание!
                            showMark: false, // Убираем точки
                          },
                        ]}
                        
                        // grid - настраиваем сетку (убираем вертикальные линии)
                        grid={{ vertical: false, horizontal: true }}

                        // sx - для тонкой настройки стилей, чтобы соответствовать референсу
                        sx={{
                            // --- Стили для легенды ---
                            '.MuiChartsLegend-series': {
                                // Делаем маркеры-линии толще
                                '& .MuiChartsLegend-mark': {
                                    height: '4px',
                                    width: '16px',
                                    borderRadius: '2px',
                                },
                            },
                            '.MuiChartsLegend-root': {
                                // Сдвигаем легенду чуть ниже
                                transform: 'translateY(-10px)',
                            },

                            // --- Стили для осей и сетки ---
                            '.MuiChartsAxis-line': {
                                // Убираем жирные линии осей
                                stroke: 'transparent',
                            },
                            '.MuiChartsAxis-tickLabel': {
                                fill: '#6b7280', // Цвет текста на осях
                                fontSize: '0.75rem', // 12px
                            },
                            '.MuiChartsGrid-line': {
                                stroke: '#e5e7eb', // Цвет линий сетки
                                strokeDasharray: '3 3', // Пунктирные линии
                            },

                            // --- Стили для тултипа при наведении ---
                            '.MuiChartsTooltip-root': {
                                backgroundColor: '#1F2937', // Темный фон
                                color: '#F9FAFB', // Светлый текст
                                borderRadius: '8px',
                                border: '1px solid #374151',
                            }
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    );
};