
export interface I2DSize {
	width :number;
	height :number;
}

export class Utils {

    static Map(value :number, inputMin :number, inputMax :number, outputMin :number, outputMax :number) :number {

			let outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);  
			if(outVal >  outputMax){
			  outVal = outputMax;
			}
			if(outVal <  outputMin){
			  outVal = outputMin;
			} 
			return outVal;
		}

		static GetWindowDimentions(): I2DSize
		{
			return {
				width: window.innerWidth, 
				height: window.innerHeight
			};
		}
}