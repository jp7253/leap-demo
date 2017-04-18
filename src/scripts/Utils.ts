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
}